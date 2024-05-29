To set up Kafka for testing in your local environment, you can follow these steps:

1. **Download Kafka:**
   - Download Apache Kafka from the official website: [Apache Kafka Downloads](https://kafka.apache.org/downloads).

2. **Extract Kafka:**
   - Extract the downloaded Kafka archive to a location on your system.

3. **Start Zookeeper:**
   - Open a terminal and navigate to the Kafka directory.
   - Start Zookeeper, which is required by Kafka.
     ```bash
     bin/zookeeper-server-start.sh config/zookeeper.properties
     ```

4. **Start Kafka Broker:**
   - Open another terminal window and navigate to the Kafka directory.
   - Start the Kafka broker.
     ```bash
     bin/kafka-server-start.sh config/server.properties
     ```

5. **Create a Kafka Topic:**
   - Open a new terminal window and navigate to the Kafka directory.
   - Create a Kafka topic. Replace `pdf-creation-events` with the desired topic name.
     ```bash
     bin/kafka-topics.sh --create --topic pdf-creation-events --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1
     ```

6. **Verify Kafka Setup:**
   - You can use Kafka console tools to produce and consume messages for testing.
     - To produce a message:
       ```bash
       bin/kafka-console-producer.sh --topic pdf-creation-events --bootstrap-server localhost:9092
       ```
       Type a message and press Enter to send it.
     - To consume messages:
       ```bash
       bin/kafka-console-consumer.sh --topic pdf-creation-events --bootstrap-server localhost:9092 --from-beginning
       ```
       This command will display all messages in the topic.
