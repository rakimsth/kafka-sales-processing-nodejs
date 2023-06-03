# Getting Started with Kafka

The idea is to show the implementation of message brokers using Kafka and nodejs. This example provides idea regarding the similar use case for using the Kafka in the nodejs application. The popular usecases are messaging, website activity tracking, data monitoring, log aggregation, stream processing(eg: recommending news articles might crawl article content from RSS feeds and publish it to an "articles" topic)

## Kafka Data Flow Diagram

![Kafka Ecosystem](/images/kafka_ecosystem.png "Kafka Ecosystem")

## What are we doing??

This repository showcases an example of using Kafka with NodeJS. In this example, we use Kafka as a messaging system for inserting hypothetical sales into a database. Instead of our sales endpoint hitting the database directly, it pushes sale data to Kafka, thus acting as a 'producer'. We spin up a 'consumer' that will take data from Kafka and push it into the database.

## Requirements:

1. Docker
2. Kafka
3. nodejs
4. mongodb

## Idea of Execution:

1. We will run the kafka and zookeeper as the docker containers.
2. We will also install and run the mongodb in our system. You can choose mongodb as docker container as well by updating docker compose file and env variables in the applications.
3. Once we have all the above services installed, we will run the following code snippet to get the HOST_IP for the kafka to start the services and docker compose all at once:

```sh
export HOST_IP=$(ifconfig | grep -E "([0-9]{1,3}\.){3}[0-9]{1,3}" | grep -v 127.0.0.1 | awk '{ print $2 }' | cut -f2 -d: | head -n1)
docker-compose up
```

`NOTE`: Above command allows us to connect to our Kafka broker at $(HOST_IP):9092

4. This will ensure we have the kafka properly configured with the application.
5. Now Let's Set up the 2 applications

- We will be using the nodejs application using express framework; namely `producer` and `consumer`
- setup the basic app with mongoose connection for both the applications
- We will be using the database model called `sales` which will consists of `total and sales date` only

<hr>

### Producer App

- The idea of producer app is to have two routes

1. Get Route (/api/v1/sales) => This will fetch the sales data from the DB
2. POST Route(/api/v1/sales) => This will post the user sales payload to the kafka producer

- Producer will use kafka producer instance to send the user payload to the kafka brokers.

### Consumer App

- The idea of the consumer app is to only consume the messages the data coming from the kafka brokers and storing it into the DB

<hr>

## Get Started:

1. Bootstrap the Application

- Go to the producer folder and run `npm i`
- Go to the consumer folder and run `npm i`

2. Run the application in the multiple terminals in the following order.

- Run the above written script to get the docker running:

```sh
export HOST_IP=$(ifconfig | grep -E "([0-9]{1,3}\.){3}[0-9]{1,3}" | grep -v 127.0.0.1 | awk '{ print $2 }' | cut -f2 -d: | head -n1)
docker-compose up
```

- cd into producer, and run `npm run start`

- cd into consumer, and run `npm run start`

- Using postman or any other tool; call the POST API Routes of the producer like shown below:

![API POST](/images/post_request.png "post API")

- Now, Query the Data from the DB using the GET Route from the browser or postman

![GET POST](/images/get_request.png "GET API")

`NOTE:` It will take some time for the kafka to spin up all the groupId, topics.
