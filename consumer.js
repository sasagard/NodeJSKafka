const { Kafka } = require('kafkajs');

const kafka = new Kafka({
	clientId: 'my-app',
	brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'mytest'});

const run = async () => {
	await consumer.connect();
	await consumer.subscribe({ topic: 'test', fromBeginning: true });
	await consumer.run({
		eachMessage: async ({ topic, partition, message }) => {
			console.log({
				topic: topic,
				partition: partition,
				offset: message.offset,
				value: message.value.toString(),
			})
		},
	});
};

run().catch(console.error);