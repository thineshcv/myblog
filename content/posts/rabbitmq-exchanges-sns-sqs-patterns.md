---
title: "RabbitMQ Exchanges: Implementing AWS SNS+SQS Patterns with RabbitMQ"
date: 2025-07-13
excerpt: "Deep dive into RabbitMQ exchange types and how they map to AWS SNS+SQS fan-out and topic patterns. Includes working Python examples for direct, fanout, topic, and headers exchanges."
tags:
  - RabbitMQ
  - Message Queues
  - DevOps
  - Python
  - Event-Driven Architecture
  - AWS
---

If you've worked with AWS, you've probably used **SNS + SQS** to build event-driven architectures — SNS for fan-out publishing, SQS for durable queue consumption. But what if you need the same patterns on-prem, in Kubernetes, or just want more control with more powerfull tool? **RabbitMQ exchanges** give you all of that and more, with finer-grained routing built right in.

This post explains RabbitMQ exchange types by mapping them to SNS/SQS patterns you already know, with working Python examples using `pika`.

---

## The SNS + SQS Model (Quick Recap)

In AWS:

- **SNS Topic** = a publish-subscribe hub. Publishers send a message to a topic.
- **SQS Queues** = subscribers. Each queue subscribed to the topic gets a copy of every message.
- **SNS Filter Policies** = optional routing rules so queues only receive messages matching certain attributes.

The common patterns:

| Pattern | How it works |
|---------|-------------|
| **Fan-out** | SNS topic → multiple SQS queues, each gets every message |
| **Topic-based routing** | SNS topic with filter policies → queues get only matching messages |
| **Point-to-point** | Single SQS queue, one consumer processes each message |

RabbitMQ implements **all three** — and more — through its exchange types.

---

## RabbitMQ Architecture: Exchanges, Queues, and Bindings

```
Producer → Exchange → [Binding + Routing Key] → Queue → Consumer
```

The key concepts:

- **Exchange**: receives messages from producers and routes them to queues. This is your "SNS Topic" equivalent.
- **Queue**: stores messages until consumed. This is your "SQS Queue" equivalent.
- **Binding**: the rule that connects an exchange to a queue, optionally with a routing key or pattern.
- **Routing Key**: a string label attached to each message that exchanges use for routing decisions.

The critical difference from SNS/SQS: RabbitMQ gives you **four exchange types**, each with different routing logic.

---

## Exchange Type 1: Fanout Exchange (= SNS Fan-out)

A fanout exchange broadcasts every message to **all bound queues**, ignoring the routing key entirely. This is the direct equivalent of an SNS topic with multiple SQS subscribers and no filter policies.

### Use Case

- Order placed → notify inventory service, email service, analytics service simultaneously
- Log aggregation → send every log to multiple consumers

### Python Example

```python
import pika
import json

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

# Declare a fanout exchange (equivalent to creating an SNS topic)
channel.exchange_declare(exchange='order.events', exchange_type='fanout')

# Declare queues (equivalent to creating SQS queues)
channel.queue_declare(queue='inventory-service')
channel.queue_declare(queue='email-service')
channel.queue_declare(queue='analytics-service')

# Bind queues to exchange (equivalent to subscribing SQS to SNS)
# Note: routing_key is ignored for fanout exchanges
channel.queue_bind(exchange='order.events', queue='inventory-service')
channel.queue_bind(exchange='order.events', queue='email-service')
channel.queue_bind(exchange='order.events', queue='analytics-service')

# Publish a message (all three queues receive it)
message = json.dumps({
    'order_id': 'ORD-12345',
    'customer': 'jane@example.com',
    'total': 99.99,
    'items': ['widget-a', 'widget-b']
})

channel.basic_publish(
    exchange='order.events',
    routing_key='',  # ignored by fanout
    body=message
)

print("Order event published to all subscribers")
connection.close()
```

### Consumer (any of the three services)

```python
import pika
import json

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

def handle_order(ch, method, properties, body):
    order = json.loads(body)
    print(f"[inventory-service] Processing order {order['order_id']}")
    # Reserve stock, update inventory...
    ch.basic_ack(delivery_tag=method.delivery_tag)

channel.basic_consume(queue='inventory-service', on_message_callback=handle_order)
print("Waiting for orders...")
channel.start_consuming()
```

### Mapping to AWS

| RabbitMQ | AWS Equivalent |
|----------|---------------|
| Fanout Exchange | SNS Topic (no filter policies) |
| Queue bound to exchange | SQS Queue subscribed to SNS |
| `basic_publish` | `sns.publish()` |
| `basic_consume` | `sqs.receive_message()` + `sqs.delete_message()` |

---

## Exchange Type 2: Direct Exchange (= SNS + Filter Policy on exact match)

A direct exchange routes messages to queues whose **binding key exactly matches** the message's routing key. Think of it as SNS with a filter policy that does exact string matching on a single attribute.

### Use Case

- Route logs by severity: `error` goes to the alerting queue, `info` goes to archive
- Route payments by method: `card`, `bank_transfer`, `crypto` to different processors

### Python Example

```python
import pika

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

# Declare a direct exchange
channel.exchange_declare(exchange='logs', exchange_type='direct')

# Declare queues for different severity levels
channel.queue_declare(queue='logs.error')
channel.queue_declare(queue='logs.info')
channel.queue_declare(queue='logs.all')

# Bind with specific routing keys
channel.queue_bind(exchange='logs', queue='logs.error', routing_key='error')
channel.queue_bind(exchange='logs', queue='logs.error', routing_key='critical')
channel.queue_bind(exchange='logs', queue='logs.info', routing_key='info')

# A queue can bind to multiple keys (receives errors AND info)
channel.queue_bind(exchange='logs', queue='logs.all', routing_key='error')
channel.queue_bind(exchange='logs', queue='logs.all', routing_key='critical')
channel.queue_bind(exchange='logs', queue='logs.all', routing_key='info')
channel.queue_bind(exchange='logs', queue='logs.all', routing_key='debug')

# Publish with routing key — only matching queues receive it
channel.basic_publish(exchange='logs', routing_key='error', body='Database connection failed')
# → delivered to: logs.error, logs.all

channel.basic_publish(exchange='logs', routing_key='info', body='User logged in')
# → delivered to: logs.info, logs.all

channel.basic_publish(exchange='logs', routing_key='debug', body='Cache hit ratio: 94%')
# → delivered to: logs.all only

connection.close()
```

### Mapping to AWS

| RabbitMQ Direct Exchange | AWS Equivalent |
|--------------------------|---------------|
| Routing key = `"error"` | SNS message attribute `severity = "error"` |
| Binding key on queue | SQS filter policy: `{"severity": ["error"]}` |
| Multiple bindings on one queue | Filter policy with multiple values: `{"severity": ["error", "critical"]}` |

---

## Exchange Type 3: Topic Exchange (= SNS with wildcard filter policies)

A topic exchange routes based on **pattern matching** against the routing key. Routing keys are dot-separated strings (like `order.created.us`), and bindings can use wildcards:

- `*` matches exactly **one** word
- `#` matches **zero or more** words

This is the most flexible and the closest equivalent to SNS filter policies with prefix/suffix matching.

### Use Case

- Multi-region event routing: `order.created.us`, `order.created.eu`, `payment.failed.us`
- Multi-tenant systems: route events by `{service}.{event}.{region}`

### Python Example

```python
import pika
import json

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

# Declare a topic exchange
channel.exchange_declare(exchange='platform.events', exchange_type='topic')

# Declare service queues
channel.queue_declare(queue='us-order-processor')
channel.queue_declare(queue='global-order-audit')
channel.queue_declare(queue='payment-alerts')
channel.queue_declare(queue='all-events-archive')

# Bindings with patterns
# US order processor: only order events from US region
channel.queue_bind(
    exchange='platform.events',
    queue='us-order-processor',
    routing_key='order.*.us'  # order.created.us, order.cancelled.us
)

# Global order audit: all order events from any region
channel.queue_bind(
    exchange='platform.events',
    queue='global-order-audit',
    routing_key='order.#'  # order.created.us, order.refunded.eu, etc.
)

# Payment alerts: only payment failures
channel.queue_bind(
    exchange='platform.events',
    queue='payment-alerts',
    routing_key='payment.failed.*'  # payment.failed.us, payment.failed.eu
)

# Archive: literally everything
channel.queue_bind(
    exchange='platform.events',
    queue='all-events-archive',
    routing_key='#'  # matches all routing keys
)

# Publish events
channel.basic_publish(
    exchange='platform.events',
    routing_key='order.created.us',
    body=json.dumps({'order_id': 'ORD-001', 'region': 'us'})
)
# → delivered to: us-order-processor, global-order-audit, all-events-archive

channel.basic_publish(
    exchange='platform.events',
    routing_key='order.created.eu',
    body=json.dumps({'order_id': 'ORD-002', 'region': 'eu'})
)
# → delivered to: global-order-audit, all-events-archive (NOT us-order-processor)

channel.basic_publish(
    exchange='platform.events',
    routing_key='payment.failed.us',
    body=json.dumps({'payment_id': 'PAY-001', 'reason': 'insufficient_funds'})
)
# → delivered to: payment-alerts, all-events-archive

connection.close()
```

### Pattern Matching Cheat Sheet

| Pattern | Matches | Doesn't Match |
|---------|---------|---------------|
| `order.*.*` | `order.created.us`, `order.cancelled.eu` | `order.created` (too few words) |
| `order.#` | `order`, `order.created`, `order.created.us.east` | `payment.created.us` |
| `*.failed.*` | `payment.failed.us`, `order.failed.eu` | `payment.failed` |
| `#` | Everything | — |

### Mapping to AWS

| RabbitMQ Topic Exchange | AWS Equivalent |
|------------------------|---------------|
| Routing key `order.created.us` | SNS message attributes `{"service": "order", "event": "created", "region": "us"}` |
| Binding `order.*.us` | Filter policy: `{"service": ["order"], "region": ["us"]}` |
| Binding `order.#` | Filter policy: `{"service": ["order"]}` (prefix match) |
| Binding `#` (all) | No filter policy (receive everything) |

---

## Exchange Type 4: Headers Exchange (= SNS attribute-based filtering)

A headers exchange ignores the routing key entirely and routes based on **message headers** (key-value pairs). You can require **all** headers match (`x-match: all`) or **any** header match (`x-match: any`).

This is the closest to SNS filter policies with multiple attribute conditions.

### Use Case

- Route messages based on content type + priority + source system
- Complex routing where a single routing key string isn't expressive enough

### Python Example

```python
import pika

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

# Declare a headers exchange
channel.exchange_declare(exchange='notifications', exchange_type='headers')

channel.queue_declare(queue='urgent-email')
channel.queue_declare(queue='slack-alerts')
channel.queue_declare(queue='audit-log')

# Bind with header matching rules
# urgent-email: must match BOTH priority=high AND channel=email
channel.queue_bind(
    exchange='notifications',
    queue='urgent-email',
    routing_key='',
    arguments={'x-match': 'all', 'priority': 'high', 'channel': 'email'}
)

# slack-alerts: match ANY of these — priority=high OR source=monitoring
channel.queue_bind(
    exchange='notifications',
    queue='slack-alerts',
    routing_key='',
    arguments={'x-match': 'any', 'priority': 'high', 'source': 'monitoring'}
)

# audit-log: any message with source=payment (regardless of other headers)
channel.queue_bind(
    exchange='notifications',
    queue='audit-log',
    routing_key='',
    arguments={'x-match': 'any', 'source': 'payment'}
)

# Publish with headers
channel.basic_publish(
    exchange='notifications',
    routing_key='',
    body='Payment gateway timeout',
    properties=pika.BasicProperties(
        headers={'priority': 'high', 'channel': 'email', 'source': 'payment'}
    )
)
# → delivered to: urgent-email (all match), slack-alerts (priority=high), audit-log (source=payment)

channel.basic_publish(
    exchange='notifications',
    routing_key='',
    body='CPU usage at 92%',
    properties=pika.BasicProperties(
        headers={'priority': 'medium', 'source': 'monitoring'}
    )
)
# → delivered to: slack-alerts only (source=monitoring matches)

connection.close()
```

---

## Putting It All Together: Complete Event-Driven System

Here's a realistic example combining multiple exchange types — like you'd use in a Kubernetes microservices deployment:

```python
import pika
import json
from datetime import datetime

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

# === Exchange Setup ===

# Fan-out for system-wide events (every service needs these)
channel.exchange_declare(exchange='system.broadcast', exchange_type='fanout')

# Topic exchange for domain events (services subscribe to what they need)
channel.exchange_declare(exchange='domain.events', exchange_type='topic')

# Direct exchange for task routing (specific worker picks up specific task types)
channel.exchange_declare(exchange='tasks', exchange_type='direct')

# === Queue Setup ===
queues = [
    'config-reload-all',        # fanout: all services reload config
    'order-service',            # topic: order.* events
    'shipping-service',         # topic: order.confirmed.* events
    'analytics-pipeline',       # topic: *.created.* events
    'pdf-generator',            # direct: task type = generate-pdf
    'email-sender',             # direct: task type = send-email
    'image-resizer',            # direct: task type = resize-image
]

for q in queues:
    channel.queue_declare(queue=q, durable=True)

# === Bindings ===

# Every service gets broadcast messages
channel.queue_bind(exchange='system.broadcast', queue='config-reload-all')

# Topic-based subscriptions
channel.queue_bind(exchange='domain.events', queue='order-service', routing_key='order.#')
channel.queue_bind(exchange='domain.events', queue='shipping-service', routing_key='order.confirmed.*')
channel.queue_bind(exchange='domain.events', queue='analytics-pipeline', routing_key='*.created.*')

# Direct task routing
channel.queue_bind(exchange='tasks', queue='pdf-generator', routing_key='generate-pdf')
channel.queue_bind(exchange='tasks', queue='email-sender', routing_key='send-email')
channel.queue_bind(exchange='tasks', queue='image-resizer', routing_key='resize-image')

# === Publishing Examples ===

# 1. Broadcast: config changed, all services must reload
channel.basic_publish(
    exchange='system.broadcast',
    routing_key='',
    body=json.dumps({'event': 'config.updated', 'timestamp': str(datetime.utcnow())})
)

# 2. Domain event: new order (goes to order-service + analytics-pipeline)
channel.basic_publish(
    exchange='domain.events',
    routing_key='order.created.us',
    body=json.dumps({'order_id': 'ORD-5678', 'customer': 'john@example.com'})
)

# 3. Domain event: order confirmed (goes to shipping-service + order-service + analytics)
channel.basic_publish(
    exchange='domain.events',
    routing_key='order.confirmed.us',
    body=json.dumps({'order_id': 'ORD-5678', 'warehouse': 'us-east-1'})
)

# 4. Task dispatch: generate invoice PDF (only pdf-generator picks it up)
channel.basic_publish(
    exchange='tasks',
    routing_key='generate-pdf',
    body=json.dumps({'template': 'invoice', 'order_id': 'ORD-5678'}),
    properties=pika.BasicProperties(delivery_mode=2)  # persistent
)

connection.close()
print("All events published successfully")
```

---

## RabbitMQ vs SNS+SQS: When to Use What

| Consideration | RabbitMQ | SNS + SQS |
|--------------|----------|-----------|
| **Deployment** | Self-managed (K8s, Docker) | Fully managed (AWS) |
| **Routing flexibility** | 4 exchange types + plugins | Filter policies (string/numeric match) |
| **Message ordering** | Per-queue FIFO guaranteed | SQS FIFO queues (limited throughput) |
| **Latency** | Sub-millisecond (in-cluster) | ~20-50ms typical |
| **Dead letter handling** | Built-in DLX exchanges | DLQ on SQS |
| **Multi-cloud / on-prem** | Yes | AWS only |
| **Scaling** | Manual (clustering, KEDA) | Auto-scaling built in |
| **Cost at high volume** | Fixed infra cost | Pay-per-message (can get expensive) |
| **Protocol** | AMQP 0-9-1, STOMP, MQTT | HTTP/HTTPS |

### Choose RabbitMQ when:
- Running in Kubernetes and want low-latency in-cluster messaging
- Need complex routing logic (topic patterns, header matching)
- Multi-cloud or on-prem deployments
- Need message priority queues
- Want protocol flexibility (AMQP, MQTT for IoT)

### Choose SNS + SQS when:
- Fully on AWS and want zero operational overhead
- Need automatic scaling without tuning
- Cross-region fan-out with minimal config
- Integrating with other AWS services (Lambda, EventBridge)

---

## Running RabbitMQ in Kubernetes

Since you're likely deploying this in K8s, here's a quick Helm setup:

```bash
# Install RabbitMQ operator
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install rabbitmq bitnami/rabbitmq \
  --set auth.username=admin \
  --set auth.password=secretpassword \
  --set persistence.size=10Gi \
  --set metrics.enabled=true \
  --set metrics.serviceMonitor.enabled=true  # for Prometheus
```

For production, use the [RabbitMQ Cluster Operator](https://www.rabbitmq.com/kubernetes/operator/operator-overview.html) which handles clustering, rolling upgrades, and TLS automatically.

Pair it with **KEDA** for autoscaling consumers based on queue depth:

```yaml
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: order-service-scaler
spec:
  scaleTargetRef:
    name: order-service
  minReplicaCount: 1
  maxReplicaCount: 10
  triggers:
    - type: rabbitmq
      metadata:
        queueName: order-service
        hostFromEnv: RABBITMQ_URL
        mode: QueueLength
        value: "50"  # scale up when queue > 50 messages
```

---

## Key Takeaways

1. **Fanout exchange = SNS topic without filters** — broadcast to all subscribers
2. **Direct exchange = SNS with exact-match filter policy** — route by exact key
3. **Topic exchange = SNS with wildcard filters** — pattern-based routing with `*` and `#`
4. **Headers exchange = SNS attribute-based filtering** — multi-condition routing on message metadata
5. RabbitMQ gives you **more routing power** but requires **operational ownership**
6. In Kubernetes, pair RabbitMQ with **KEDA** for queue-depth autoscaling

The mental model: if you can build it with SNS + SQS, you can build it with RabbitMQ exchanges — usually with more precision and lower latency, at the cost of managing the broker yourself.
