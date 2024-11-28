const { Kafka } = require('kafkajs');

const kafka = new Kafka({
	clientId: 'my-app',
	brokers: ['localhost:9092']
});

const producer = kafka.producer();

const run = async () => {
	await producer.connect();
	await producer.send({ topic: 'test', messages: [{ value: 'Hello!' }]});
	console.log('Mensaje enviado');
	await producer.disconnect();
};

run().catch(console.error);