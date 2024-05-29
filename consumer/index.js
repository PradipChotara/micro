import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'pdf-consumer',
  brokers: ['localhost:9092'], // Update with your Kafka broker address
});

const consumer = kafka.consumer({ groupId: 'pdf-processing-group' }); // Update with your consumer group ID

async function runConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'pdf-creation-events' }); // Subscribe to the Kafka topic

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      // Process each received message
      console.log({
        value: message.value.toString(),
        headers: message.headers,
      });
    },
  });
}

// Start the Kafka consumer
runConsumer().catch(console.error);
