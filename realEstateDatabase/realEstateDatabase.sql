-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: housing1
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `buyer`
--

DROP TABLE IF EXISTS `buyer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buyer` (
  `full_name` varchar(30) NOT NULL,
  `mobile` varchar(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) DEFAULT NULL,
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`mobile`),
  UNIQUE KEY `email` (`email`),
  CONSTRAINT `chk_email_format_buyer` CHECK (regexp_like(`email`,_cp850'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')),
  CONSTRAINT `chk_mobile_buyer` CHECK (regexp_like(`mobile`,_cp850'^[6-9]{1}[0-9]{9}$'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buyer`
--

LOCK TABLES `buyer` WRITE;
/*!40000 ALTER TABLE `buyer` DISABLE KEYS */;
INSERT INTO `buyer` VALUES ('Devendra Malviya','6260798400','malviyad789@gmail.com','$2b$10$PTFD89XdMO82tXJaqlI9/O4DalLUkhvIPZ0D1H4RtGSr5climQoE.','2025-05-29 01:04:14'),('Arun Dhakad','7489923852','arundhakad@gmail.com','$2b$10$czghg495y3yf3ZoDfooDUuTNKt45olLmYUz/LZSc/SvdYJtKSBQWe','2025-06-08 00:28:18'),('Abhi Sing','8787878776','singhabhishekabhi977@gmail.com','$2b$10$CWh6nnCPh9JGg1v9BjzuA.lvirzSqPfYyingbP6lqEiEAU236iZfm','2025-07-02 15:19:57'),('Hariom Shakya','8878447714','hariomdaas9999@gmail.com','$2b$10$hzuj7nIiGbjHIq.EtxhmmeRPTRKMlDurTRpZmULypQlOdQ.2NKiRm','2025-06-05 19:38:21'),('Pradeep Dhakad','9000840287','document108108@gmail.com','$2b$10$Soznnts0DolqbDDYcMaYdej1.MACZRKqPaN4.UUR8U015V2r4sRHe','2025-06-08 01:10:41'),('Piyush Saini','9098678093','sainipiyush519@gmail.com','$2b$10$Uc.MtDqFSXjB95f5u1D5S.Dq/MtS8rC0X.dp020XlQxWTvZ5SjBXm','2025-05-29 01:10:48'),('Pradeep Dhakad','9302840287','pradeepdhakad095@gmail.com','$2b$10$yTWNRXqbkLwU1APc9au0L.2FTRruABoyQc2aqdFJBnxK8zPipFzBO','2025-05-29 01:49:17'),('Bhumi Yadav','9302840888','bhoomiy347@gmail.com','$2b$10$pYShr37bKLnGUzhPDp1e8ubN6A3wV1OFMV1yWn8eq.c4StU4pbJNy','2025-06-19 13:26:23'),('Arun Dhakad','9302841234','arunhindu74@gmail.com','$2b$10$xgq8km4eBGUZUms77EY12.yJ.U7KQywZRkOBPRYyRQTgP15V7CUh2','2025-06-08 01:01:50'),('Arjun Yadav','9876500010','arjun2024@gmail.com','$2b$10$Y0wZyq5KZcTnWeAbZxM7wOcvFtzA3rq37x9UgCQfH0zU/vWBxnK/O','2024-01-04 09:45:10'),('Shivani Verma','9876500011','shivani2024@gmail.com','$2b$10$1tQqqO8I35Hcg4p8Gz8SnuQxFDYoVYpS/EeZHZ1j7B02e5Vu11JtG','2024-02-10 11:30:45'),('Kunal Singh','9876500012','kunal2024@gmail.com','$2b$10$XAXIbb.ZBe5ChU/W4ZcUNeAtgB.3AoPHNvSGe1HoFrg5jEKvH9n7y','2024-03-15 14:00:00'),('Pooja Kumari','9876500013','pooja2024@gmail.com','$2b$10$f6zYQwCwbMCALf3tOZ5UAO8RxBq7gEzhTiO0RIBJpuZqbptVXL/Fq','2024-04-20 16:45:30'),('Ramesh Rawat','9876500014','ramesh2024@gmail.com','$2b$10$Rrq.7Ty7KeD87SQQ8NOD2OCkTQ6tr08KY2ClDcA4gPEVAKTwzM1lu','2024-05-12 13:15:00'),('Neha Mehta','9876500015','neha2024@gmail.com','$2b$10$XY3WyqS9RB4vUqVJtDzG5uAfJxJ4/ay4eHKz7MRphS6aH7TwHLku2','2024-06-18 10:10:10'),('Ankit Tiwari','9876500016','ankit2024@gmail.com','$2b$10$NBtPaEmSOx9f7eHDP3qXwOmqMNSodHPSrb.9HRLCv6L6UqR0L7rl2','2024-07-23 08:25:20'),('Deepika Singh','9876500017','deepika2024@gmail.com','$2b$10$ceYmUakS22hPe.DMjaVu6uNqqBzC2fnLo.5MJ0tvbr5iIQwMnbXPi','2024-08-30 18:00:00'),('Mohit Jain','9876500018','mohit2024@gmail.com','$2b$10$7apYj1z/CucQv.0gtnz5GuLyUCYyXcktdUmAcd9YbeCdE0oPBQhTS','2024-10-05 12:12:12'),('Kriti Sharma','9876500019','kriti2024@gmail.com','$2b$10$q32A4VeMVVXwTzK0o9rqz.6rPRavXOMcTtSIFKHnHT.qc.Y82/PFy','2024-12-01 19:19:19'),('Amit Sharma','9876543001','amit1234@gmail.com','Amit@123','2025-01-04 10:12:30'),('Neha Verma','9876543002','neha1123@gmail.com','Neha@123','2025-01-08 12:22:10'),('Ravi Meena','9876543003','ravi1123@gmail.com','Ravi@123','2025-01-13 09:05:40'),('Priya Thakur','9876543004','priya1123@gmail.com','Priya@123','2025-01-17 15:45:00'),('Suresh Kumar','9876543005','suresh1213@gmail.com','Suresh@123','2025-01-20 14:30:59'),('Divya Patel','9876543006','divya1123@gmail.com','Divya@123','2025-01-24 16:00:00'),('Pooja Sen','9876543007','pooja1213@gmail.com','Pooja@123','2025-01-27 18:30:20'),('Rahul Jain','9876543008','rahul1231@gmail.com','Rahul@123','2025-01-30 19:10:10'),('Sneha Singh','9876543009','sneha11234@gmail.com','Sneha@123','2025-02-02 10:15:30'),('Manish Sharma','9876543010','ma1nish123@gmail.com','Manish@123','2025-02-06 13:25:00'),('Kavita Gupta','9876543011','kavita1123@gmail.com','Kavita@123','2025-02-10 11:40:45'),('Anil Rathore','9876543012','anil1123@gmail.com','Anil@123','2025-02-14 17:05:15'),('Bhavna Rani','9876543013','bh1avna123@gmail.com','Bhavna@123','2025-02-22 15:55:55'),('Nitin Rawat','9876543014','niti1n123@gmail.com','Nitin@123','2025-03-01 08:00:00'),('Meena Kumari','9876543015','me1ena123@gmail.com','Meena@123','2025-03-05 12:10:20'),('Deepak Joshi','9876543016','deep1ak123@gmail.com','Deepak@123','2025-03-09 10:10:10'),('Rekha Bansal','9876543017','rek1ha123@gmail.com','Rekha@123','2025-03-13 14:20:30'),('Ajay Sharma','9876543018','ajay1123@gmail.com','Ajay@123','2025-03-17 13:00:00'),('Sonam Saini','9876543019','son1am123@gmail.com','Sonam@123','2025-03-21 11:45:00'),('Tarun Kaushik','9876543020','tar1un123@gmail.com','Tarun@123','2025-03-25 17:17:17'),('Pinky Verma','9876543021','pi1nky123@gmail.com','Pinky@123','2025-03-28 13:33:33'),('Rachna Soni','9876543022','ra1chna123@gmail.com','Rachna@123','2025-04-03 08:15:00'),('Mohit Malviya','9876543023','mo1hit123@gmail.com','Mohit@123','2025-04-10 10:20:20'),('Gaurav Jain','9876543024','gaur1av123@gmail.com','Gaurav@123','2025-04-17 12:30:30'),('Kiran Bairwa','9876543025','kir1an123@gmail.com','Kiran@123','2025-04-23 14:00:00'),('Arun Kumar','9876543026','arun1123@gmail.com','Arun@123','2025-05-01 09:09:09'),('Vivek Soni','9876543027','viv1ek123@gmail.com','Vivek@123','2025-05-02 10:10:10'),('Pankaj Rathore','9876543028','pa1nkaj123@gmail.com','Pankaj@123','2025-05-04 11:11:11'),('Sheetal Dangi','9876543029','she1etal123@gmail.com','Sheetal@123','2025-05-06 12:12:12'),('Harshita Raj','9876543030','har1shita123@gmail.com','Harshita@123','2025-05-08 13:13:13'),('Ritu Sharma','9876543031','ri1tu123@gmail.com','Ritu@123','2025-05-10 14:14:14'),('Dinesh Bairwa','9876543032','din1esh123@gmail.com','Dinesh@123','2025-05-12 15:15:15'),('Shalini Chauhan','9876543033','sh1alini123@gmail.com','Shalini@123','2025-05-14 16:16:16'),('Tarika Jain','9876543034','tari1ka123@gmail.com','Tarika@123','2025-05-16 17:17:17'),('Vipin Jain','9876543035','vipin1123@gmail.com','Vipin@123','2025-05-18 18:18:18'),('Savita Yadav','9876543036','sa1vita123@gmail.com','Savita@123','2025-05-20 19:19:19'),('Ritesh Dhakad','9876543037','r1itesh123@gmail.com','Ritesh@123','2025-05-22 20:20:20'),('Geeta Meena','9876543038','ge1eta123@gmail.com','Geeta@123','2025-05-24 21:21:21'),('Anjali Nagar','9876543039','an1jali123@gmail.com','Anjali@123','2025-05-26 22:22:22'),('Lokesh Gupta','9876543040','l1okesh123@gmail.com','Lokesh@123','2025-05-28 23:23:23'),('Amit Sharma','9876543101','amit123@gmail.com','Amit@123','2025-01-04 10:12:30'),('Ravi Verma','9876543102','ravi123@gmail.com','Ravi@123','2025-01-10 11:45:12'),('Neha Jain','9876543103','neha123@gmail.com','Neha@123','2025-01-15 14:22:59'),('Suresh Kumar','9876543104','suresh123@gmail.com','Suresh@123','2025-01-18 09:30:00'),('Divya Mehta','9876543105','divya123@gmail.com','Divya@123','2025-01-20 17:05:22'),('Ankit Singh','9876543106','ankit123@gmail.com','Ankit@123','2025-01-25 16:17:48'),('Pooja Gupta','9876543107','pooja123@gmail.com','Pooja@123','2025-01-27 13:30:45'),('Rohit Yadav','9876543108','rohit123@gmail.com','Rohit@123','2025-01-30 18:50:33'),('Kiran Rathore','9876543109','kiran123@gmail.com','Kiran@123','2025-02-03 10:03:25'),('Vikas Sharma','9876543110','vikas123@gmail.com','Vikas@123','2025-02-06 12:25:18'),('Sneha Kapoor','9876543111','sneha123@gmail.com','Sneha@123','2025-02-10 15:45:55'),('Manoj Patil','9876543112','manoj123@gmail.com','Manoj@123','2025-02-15 09:19:02'),('Ritika Bhatt','9876543113','ritika123@gmail.com','Ritika@123','2025-02-21 19:30:10'),('Tarun Joshi','9876543114','tarun123@gmail.com','Tarun@123','2025-03-02 08:00:00'),('Payal Desai','9876543115','payal123@gmail.com','Payal@123','2025-03-06 14:15:00'),('Arvind Chauhan','9876543116','arvind123@gmail.com','Arvind@123','2025-03-09 10:10:10'),('Rekha Bansal','9876543117','rekha123@gmail.com','Rekha@123','2025-03-12 16:20:30'),('Deepak Dubey','9876543118','deepak123@gmail.com','Deepak@123','2025-03-17 12:00:00'),('Mansi Thakur','9876543119','mansi123@gmail.com','Mansi@123','2025-03-21 11:45:00'),('Nitin Saxena','9876543120','nitin123@gmail.com','Nitin@123','2025-03-25 17:17:17'),('Kajal Rawat','9876543121','kajal123@gmail.com','Kajal@123','2025-03-28 13:33:33'),('Sunny Kaushik','9876543122','sunny123@gmail.com','Sunny@123','2025-04-03 08:15:00'),('Bhavna Rani','9876543123','bhavna123@gmail.com','Bhavna@123','2025-04-10 10:20:20'),('Dinesh Bairwa','9876543124','dinesh123@gmail.com','Dinesh@123','2025-04-17 12:30:30'),('Pinky Verma','9876543125','pinky123@gmail.com','Pinky@123','2025-04-23 14:00:00'),('Vivek Meena','9876543126','vivek123@gmail.com','Vivek@123','2025-05-01 09:09:09'),('Kavita Joshi','9876543127','kavita123@gmail.com','Kavita@123','2025-05-05 13:13:13'),('Gaurav Jain','9876543128','gaurav123@gmail.com','Gaurav@123','2025-05-11 15:15:15'),('Meena Kumari','9876543129','meena123@gmail.com','Meena@123','2025-05-17 11:11:11'),('Ajay Bairwa','9876543130','ajay123@gmail.com','Ajay@123','2025-05-22 16:16:16'),('Rachna Singh','9876543131','rachna123@gmail.com','Rachna@123','2025-05-29 18:18:18'),('Rahul Sharma','9876543210','rahul@example.com','$2b$10$42MV5EN/8v5lyxzn4egCkuLHxy8AqyZ.2zkOqUI7z86NKZX6m.Mne','2025-05-29 01:02:03');
/*!40000 ALTER TABLE `buyer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buyer_interest`
--

DROP TABLE IF EXISTS `buyer_interest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buyer_interest` (
  `buyer_mobile` varchar(10) NOT NULL,
  `property_number` varchar(20) NOT NULL,
  `interested_on` datetime DEFAULT CURRENT_TIMESTAMP,
  `seller_mobile` varchar(10) NOT NULL,
  PRIMARY KEY (`buyer_mobile`,`property_number`),
  KEY `fk_property_interest` (`property_number`),
  KEY `fk_seller_interest` (`seller_mobile`),
  CONSTRAINT `fk_buyer_interest` FOREIGN KEY (`buyer_mobile`) REFERENCES `buyer` (`mobile`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_property_interest` FOREIGN KEY (`property_number`) REFERENCES `property_details` (`property_number`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_seller_interest` FOREIGN KEY (`seller_mobile`) REFERENCES `seller` (`mobile`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buyer_interest`
--

LOCK TABLES `buyer_interest` WRITE;
/*!40000 ALTER TABLE `buyer_interest` DISABLE KEYS */;
INSERT INTO `buyer_interest` VALUES ('6260798400','P201','2025-06-12 13:29:32','9302840287'),('6260798400','P202','2025-06-27 17:01:43','9302840286'),('6260798400','P203','2025-06-26 11:42:25','7897897890'),('6260798400','P204','2025-06-12 13:29:41','9302840287'),('6260798400','P207','2025-06-12 13:29:50','9302840287'),('6260798400','P209','2025-06-12 13:30:00','7897897890'),('6260798400','P210','2025-06-11 13:44:44','9302840287'),('6260798400','P213','2025-06-12 13:30:15','9302840287'),('6260798400','P216','2025-06-11 14:06:31','9302840287'),('6260798400','P219','2025-06-11 14:09:29','9302840287'),('7489923852','P201','2025-06-08 00:29:36','9302840287'),('7489923852','P205','2025-06-08 00:29:48','9302840286'),('7489923852','P207','2025-06-08 00:29:55','9302840287'),('7489923852','P233','2025-06-08 00:30:55','9302840287'),('7489923852','P236','2025-06-08 00:30:41','9302840287'),('7489923852','P239','2025-06-08 00:30:26','9302840287'),('7489923852','P244','2025-06-08 00:30:11','9302840287'),('8878447714','P263','2025-06-23 15:55:50','9302840287'),('8878447714','P266','2025-06-23 15:49:53','9302840287'),('8878447714','P269','2025-06-23 15:46:42','9302840287'),('8878447714','P323','2025-06-23 15:45:52','9302840287'),('9098678093','P201','2025-06-08 00:23:09','9302840287'),('9098678093','P202','2025-06-08 00:23:24','9302840286'),('9098678093','P203','2025-06-08 00:23:43','7897897890'),('9098678093','P204','2025-06-05 15:48:19','9302840287'),('9098678093','P210','2025-06-05 15:48:56','9302840287'),('9098678093','P211','2025-06-08 00:24:39','9302840286'),('9098678093','P213','2025-06-05 15:54:45','9302840287'),('9098678093','P216','2025-06-05 18:02:42','9302840287'),('9098678093','P227','2025-06-08 00:25:42','9302840287'),('9098678093','P228','2025-06-08 00:25:34','9302840286'),('9098678093','P230','2025-06-08 00:25:23','9302840287'),('9098678093','P231','2025-06-08 00:25:17','9302840286'),('9098678093','P233','2025-06-23 11:12:09','9302840287'),('9302840287','P201','2025-06-12 11:53:09','9302840287'),('9302840287','P202','2025-06-19 14:00:49','9302840286'),('9302840287','P204','2025-06-12 11:53:43','9302840287'),('9302840287','P207','2025-06-12 11:54:00','9302840287'),('9302840287','P208','2025-06-12 11:54:39','9302840286'),('9302840287','P210','2025-06-12 11:55:37','9302840287'),('9302840287','P213','2025-06-11 16:05:14','9302840287'),('9302840287','P219','2025-06-12 13:05:00','9302840287'),('9302840287','P221','2025-06-12 12:57:06','9302840287'),('9302840287','P224','2025-07-02 15:17:41','9302840287'),('9302840287','P227','2025-06-13 00:11:33','9302840287'),('9302840287','P230','2025-06-12 13:04:23','9302840287'),('9302840287','P236','2025-06-20 13:38:13','9302840287'),('9302840287','P999','2025-06-22 04:50:12','9098678093'),('9302841234','P201','2025-06-12 13:30:58','9302840287'),('9302841234','P204','2025-06-12 13:31:10','9302840287'),('9302841234','P207','2025-06-12 13:31:21','9302840287'),('9302841234','P210','2025-06-12 13:31:33','9302840287'),('9302841234','P213','2025-06-12 13:31:43','9302840287'),('9302841234','P219','2025-06-12 13:32:14','9302840287'),('9302841234','P277','2025-06-12 16:16:48','9302840287'),('9876543210','P201','2025-06-12 13:27:53','9302840287'),('9876543210','P204','2025-06-12 13:28:00','9302840287'),('9876543210','P207','2025-06-12 13:28:11','9302840287'),('9876543210','P210','2025-06-12 13:28:36','9302840287'),('9876543210','P213','2025-06-12 13:28:45','9302840287');
/*!40000 ALTER TABLE `buyer_interest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buyer_profile`
--

DROP TABLE IF EXISTS `buyer_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buyer_profile` (
  `mobile` varchar(10) NOT NULL,
  `aadhar` varchar(12) NOT NULL,
  `pan` varchar(10) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `address` text NOT NULL,
  PRIMARY KEY (`mobile`),
  UNIQUE KEY `aadhar` (`aadhar`),
  UNIQUE KEY `pan` (`pan`),
  CONSTRAINT `fk_buyer_mobile` FOREIGN KEY (`mobile`) REFERENCES `buyer` (`mobile`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chk_aadhar_buyer` CHECK (regexp_like(`aadhar`,_cp850'^[0-9]{12}$')),
  CONSTRAINT `chk_gender_buyer` CHECK ((`gender` in (_cp850'Male',_cp850'Female',_cp850'Other'))),
  CONSTRAINT `chk_pan_buyer` CHECK (regexp_like(`pan`,_cp850'^[A-Z]{5}[0-9]{4}[A-Z]$'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buyer_profile`
--

LOCK TABLES `buyer_profile` WRITE;
/*!40000 ALTER TABLE `buyer_profile` DISABLE KEYS */;
/*!40000 ALTER TABLE `buyer_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buyer_remarks`
--

DROP TABLE IF EXISTS `buyer_remarks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buyer_remarks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `seller_mobile` varchar(15) NOT NULL,
  `buyer_mobile` varchar(15) NOT NULL,
  `property_number` varchar(50) NOT NULL,
  `remark` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_remark` (`seller_mobile`,`buyer_mobile`,`property_number`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buyer_remarks`
--

LOCK TABLES `buyer_remarks` WRITE;
/*!40000 ALTER TABLE `buyer_remarks` DISABLE KEYS */;
INSERT INTO `buyer_remarks` VALUES (1,'9302840287','9098678093','P210','Call Tomorrow','2025-06-06 08:16:07','2025-06-06 10:54:12'),(2,'9302840287','9302840287','P210','Follow up after weekend','2025-06-06 08:16:08','2025-06-06 11:16:05'),(3,'9302840287','9098678093','P216','meeting fixed tommorrow','2025-06-06 10:51:36','2025-06-06 11:32:58'),(4,'9302840287','9302840287','P207','this buyer interested Call after 5 days','2025-06-06 10:56:21','2025-06-07 19:14:51'),(5,'9302840287','9098678093','P204','call after 3 days','2025-06-06 11:13:15','2025-06-06 11:13:15'),(6,'9302840287','9098678093','P213','meeting tommrow','2025-06-06 11:14:02','2025-06-06 11:14:02'),(7,'9302840287','9302840287','P204','Buyer wants to visit property','2025-06-06 11:17:05','2025-06-06 11:17:05'),(8,'9302840287','9098678093','P201','visit property','2025-06-07 19:04:53','2025-06-07 19:06:24'),(9,'9302840287','7489923852','P201','call today','2025-06-07 19:05:35','2025-06-27 11:41:20'),(10,'9302840287','7489923852','P207','visit site','2025-06-08 19:33:49','2025-06-08 19:33:49'),(11,'9302840287','9098678093','P230','meeting monday','2025-06-10 21:11:54','2025-06-10 21:11:54'),(12,'9302840287','6260798400','P219','call on manday','2025-06-19 08:02:02','2025-06-19 08:02:16'),(13,'9302840287','9098678093','P227','No remark available','2025-06-20 08:17:12','2025-06-20 08:17:12'),(14,'9302840287','9302840287','P227','No remark available','2025-06-20 08:17:16','2025-06-20 08:17:16'),(15,'9302840287','8878447714','P263','call on monady','2025-07-02 09:48:38','2025-07-02 09:48:38');
/*!40000 ALTER TABLE `buyer_remarks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buyer_saved_property`
--

DROP TABLE IF EXISTS `buyer_saved_property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buyer_saved_property` (
  `mobile` varchar(10) NOT NULL,
  `property_number` varchar(20) NOT NULL,
  `saved_on` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`mobile`,`property_number`),
  KEY `property_number` (`property_number`),
  CONSTRAINT `buyer_saved_property_ibfk_1` FOREIGN KEY (`mobile`) REFERENCES `buyer` (`mobile`) ON DELETE CASCADE,
  CONSTRAINT `buyer_saved_property_ibfk_2` FOREIGN KEY (`property_number`) REFERENCES `property_details` (`property_number`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buyer_saved_property`
--

LOCK TABLES `buyer_saved_property` WRITE;
/*!40000 ALTER TABLE `buyer_saved_property` DISABLE KEYS */;
INSERT INTO `buyer_saved_property` VALUES ('6260798400','P201','2025-06-22 04:00:56'),('6260798400','P202','2025-06-27 17:01:34'),('6260798400','P204','2025-06-22 04:01:09'),('6260798400','P207','2025-06-22 04:01:28'),('7489923852','P201','2025-06-08 00:29:38'),('7489923852','P233','2025-06-08 00:30:58'),('7489923852','P236','2025-06-08 00:30:44'),('7489923852','P239','2025-06-08 00:30:28'),('7489923852','P244','2025-06-08 00:30:14'),('8878447714','P201','2025-06-23 11:22:06'),('8878447714','P203','2025-06-05 19:39:10'),('8878447714','P204','2025-06-23 11:23:13'),('8878447714','P207','2025-06-23 11:23:39'),('9098678093','P201','2025-06-08 00:23:12'),('9098678093','P202','2025-06-08 00:23:27'),('9098678093','P203','2025-06-08 00:24:03'),('9098678093','P204','2025-06-05 15:48:14'),('9098678093','P210','2025-06-05 15:48:53'),('9098678093','P211','2025-06-08 00:24:42'),('9098678093','P227','2025-06-08 00:25:45'),('9098678093','P230','2025-06-08 00:25:26'),('9302840287','P202','2025-06-19 14:00:38'),('9302840287','P204','2025-06-05 15:24:35'),('9302840287','P210','2025-06-05 15:46:36'),('9302840287','P215','2025-06-11 02:38:44'),('9302840287','P219','2025-06-09 12:50:07'),('9302840287','P224','2025-06-09 12:50:50'),('9302840287','P227','2025-06-09 12:50:59'),('9302840287','P230','2025-06-09 12:51:13'),('9302840287','P999','2025-06-22 04:50:09');
/*!40000 ALTER TABLE `buyer_saved_property` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `not_interested_buyers`
--

DROP TABLE IF EXISTS `not_interested_buyers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `not_interested_buyers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `seller_mobile` varchar(20) DEFAULT NULL,
  `buyer_mobile` varchar(20) DEFAULT NULL,
  `property_number` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `not_interested_buyers`
--

LOCK TABLES `not_interested_buyers` WRITE;
/*!40000 ALTER TABLE `not_interested_buyers` DISABLE KEYS */;
/*!40000 ALTER TABLE `not_interested_buyers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_buyer_inquiry`
--

DROP TABLE IF EXISTS `notification_buyer_inquiry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification_buyer_inquiry` (
  `id` int NOT NULL AUTO_INCREMENT,
  `seller_mobile` varchar(15) NOT NULL,
  `property_number` varchar(50) NOT NULL,
  `buyer_mobile` varchar(15) NOT NULL,
  `notified_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_notification` (`seller_mobile`,`property_number`,`buyer_mobile`)
) ENGINE=InnoDB AUTO_INCREMENT=568 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_buyer_inquiry`
--

LOCK TABLES `notification_buyer_inquiry` WRITE;
/*!40000 ALTER TABLE `notification_buyer_inquiry` DISABLE KEYS */;
INSERT INTO `notification_buyer_inquiry` VALUES (4,'9302840286','P208','9302840287','2025-06-12 11:54:42'),(38,'7897897890','P209','6260798400','2025-06-12 13:30:02'),(248,'9302840287','P210','9990000001','2025-06-12 15:20:01'),(249,'9302840287','P210','9990000002','2025-06-12 15:20:01'),(250,'9302840287','P210','9990000003','2025-06-12 15:20:01'),(251,'9302840287','P210','9990000004','2025-06-12 15:20:01'),(252,'9302840287','P210','9990000005','2025-06-12 15:20:01'),(253,'9302840287','P210','9990000006','2025-06-12 15:20:01'),(254,'9302840287','P210','9990000007','2025-06-12 15:20:01'),(255,'9302840287','P210','9990000008','2025-06-12 15:20:01'),(256,'9302840287','P210','9990000009','2025-06-12 15:20:01'),(257,'9302840287','P210','9990000010','2025-06-12 15:20:01'),(258,'9302840287','P210','9990000011','2025-06-12 15:20:01'),(259,'9302840287','P210','9990000012','2025-06-12 15:20:01'),(260,'9302840287','P210','9990000013','2025-06-12 15:20:01'),(261,'9302840287','P210','9990000014','2025-06-12 15:20:01'),(262,'9302840287','P210','9990000015','2025-06-12 15:20:01'),(263,'9302840287','P210','9990000016','2025-06-12 15:20:01'),(264,'9302840287','P210','9990000017','2025-06-12 15:20:01'),(265,'9302840287','P210','9990000018','2025-06-12 15:20:01'),(266,'9302840287','P210','9990000019','2025-06-12 15:20:01'),(267,'9302840287','P210','9990000020','2025-06-12 15:20:01'),(268,'9302840287','P210','9990000021','2025-06-12 15:20:01'),(269,'9302840287','P210','9990000022','2025-06-12 15:20:01'),(270,'9302840287','P210','9990000023','2025-06-12 15:20:01'),(271,'9302840287','P210','9990000024','2025-06-12 15:20:01'),(272,'9302840287','P210','9990000025','2025-06-12 15:20:01'),(273,'9302840287','P210','9990000026','2025-06-12 15:20:01'),(274,'9302840287','P210','9990000027','2025-06-12 15:20:01'),(275,'9302840287','P210','9990000028','2025-06-12 15:20:01'),(276,'9302840287','P210','9990000029','2025-06-12 15:20:01'),(277,'9302840287','P210','9990000030','2025-06-12 15:20:01'),(278,'9302840287','P210','9990000031','2025-06-12 15:20:01'),(279,'9302840287','P210','9990000032','2025-06-12 15:20:01'),(280,'9302840287','P210','9990000033','2025-06-12 15:20:01'),(281,'9302840287','P210','9990000034','2025-06-12 15:20:01'),(282,'9302840287','P210','9990000035','2025-06-12 15:20:01'),(283,'9302840287','P210','9990000036','2025-06-12 15:20:01'),(284,'9302840287','P210','9990000037','2025-06-12 15:20:01'),(285,'9302840287','P210','9990000038','2025-06-12 15:20:01'),(286,'9302840287','P210','9990000039','2025-06-12 15:20:01'),(287,'9302840287','P210','9990000040','2025-06-12 15:20:01'),(288,'9302840287','P210','9990000041','2025-06-12 15:20:01'),(289,'9302840287','P210','9990000042','2025-06-12 15:20:01'),(290,'9302840287','P210','9990000043','2025-06-12 15:20:01'),(291,'9302840287','P210','9990000044','2025-06-12 15:20:01'),(292,'9302840287','P210','9990000045','2025-06-12 15:20:01'),(293,'9302840287','P210','9990000046','2025-06-12 15:20:01'),(294,'9302840287','P210','9990000047','2025-06-12 15:20:01'),(295,'9302840287','P210','9990000048','2025-06-12 15:20:01'),(296,'9302840287','P210','9990000049','2025-06-12 15:20:01'),(297,'9302840287','P210','9990000050','2025-06-12 15:20:01'),(298,'9302840287','P210','9990000051','2025-06-12 15:20:01'),(299,'9302840287','P210','9990000052','2025-06-12 15:20:01'),(300,'9302840287','P210','9990000053','2025-06-12 15:20:01'),(301,'9302840287','P210','9990000054','2025-06-12 15:20:01'),(302,'9302840287','P210','9990000055','2025-06-12 15:20:01'),(303,'9302840287','P210','9990000056','2025-06-12 15:20:01'),(304,'9302840287','P210','9990000057','2025-06-12 15:20:01'),(305,'9302840287','P210','9990000058','2025-06-12 15:20:01'),(306,'9302840287','P210','9990000059','2025-06-12 15:20:01'),(307,'9302840287','P210','9990000060','2025-06-12 15:20:01'),(308,'9302840287','P210','9990000061','2025-06-12 15:20:01'),(309,'9302840287','P210','9990000062','2025-06-12 15:20:01'),(310,'9302840287','P210','9990000063','2025-06-12 15:20:01'),(311,'9302840287','P210','9990000064','2025-06-12 15:20:01'),(312,'9302840287','P210','9990000065','2025-06-12 15:20:01'),(313,'9302840287','P210','9990000066','2025-06-12 15:20:01'),(314,'9302840287','P210','9990000067','2025-06-12 15:20:01'),(315,'9302840287','P210','9990000068','2025-06-12 15:20:01'),(316,'9302840287','P210','9990000069','2025-06-12 15:20:01'),(317,'9302840287','P210','9990000070','2025-06-12 15:20:01'),(318,'9302840287','P210','9990000071','2025-06-12 15:20:01'),(319,'9302840287','P210','9990000072','2025-06-12 15:20:01'),(320,'9302840287','P210','9990000073','2025-06-12 15:20:01'),(321,'9302840287','P210','9990000074','2025-06-12 15:20:01'),(322,'9302840287','P210','9990000075','2025-06-12 15:20:01'),(323,'9302840287','P210','9990000076','2025-06-12 15:20:01'),(324,'9302840287','P210','9990000077','2025-06-12 15:20:01'),(325,'9302840287','P210','9990000078','2025-06-12 15:20:01'),(326,'9302840287','P210','9990000079','2025-06-12 15:20:01'),(327,'9302840287','P210','9990000080','2025-06-12 15:20:01'),(328,'9302840287','P210','9990000081','2025-06-12 15:20:01'),(329,'9302840287','P210','9990000082','2025-06-12 15:20:01'),(330,'9302840287','P210','9990000083','2025-06-12 15:20:01'),(331,'9302840287','P210','9990000084','2025-06-12 15:20:01'),(332,'9302840287','P210','9990000085','2025-06-12 15:20:01'),(333,'9302840287','P210','9990000086','2025-06-12 15:20:01'),(334,'9302840287','P210','9990000087','2025-06-12 15:20:01'),(335,'9302840287','P210','9990000088','2025-06-12 15:20:01'),(336,'9302840287','P210','9990000089','2025-06-12 15:20:01'),(337,'9302840287','P210','9990000090','2025-06-12 15:20:01'),(338,'9302840287','P210','9990000091','2025-06-12 15:20:01'),(339,'9302840287','P210','9990000092','2025-06-12 15:20:01'),(340,'9302840287','P210','9990000093','2025-06-12 15:20:01'),(341,'9302840287','P210','9990000094','2025-06-12 15:20:01'),(342,'9302840287','P210','9990000095','2025-06-12 15:20:01'),(343,'9302840287','P210','9990000096','2025-06-12 15:20:01'),(344,'9302840287','P210','9990000097','2025-06-12 15:20:01'),(345,'9302840287','P210','9990000098','2025-06-12 15:20:01'),(346,'9302840287','P210','9990000099','2025-06-12 15:20:01'),(347,'9302840287','P210','9990000100','2025-06-12 15:20:01'),(488,'9302840287','P204','8880000001','2025-06-12 15:22:53'),(489,'9302840287','P204','8880000002','2025-06-12 15:22:53'),(490,'9302840287','P204','8880000003','2025-06-12 15:22:53'),(491,'9302840287','P204','8880000004','2025-06-12 15:22:53'),(492,'9302840287','P204','8880000005','2025-06-12 15:22:53'),(493,'9302840287','P204','8880000006','2025-06-12 15:22:53'),(494,'9302840287','P204','8880000007','2025-06-12 15:22:53'),(495,'9302840287','P204','8880000008','2025-06-12 15:22:53'),(496,'9302840287','P204','8880000009','2025-06-12 15:22:53'),(497,'9302840287','P204','8880000010','2025-06-12 15:22:53'),(498,'9302840287','P204','8880000011','2025-06-12 15:22:53'),(499,'9302840287','P204','8880000012','2025-06-12 15:22:53'),(500,'9302840287','P204','8880000013','2025-06-12 15:22:53'),(501,'9302840287','P204','8880000014','2025-06-12 15:22:53'),(502,'9302840287','P204','8880000015','2025-06-12 15:22:53'),(503,'9302840287','P204','8880000016','2025-06-12 15:22:53'),(504,'9302840287','P204','8880000017','2025-06-12 15:22:53'),(505,'9302840287','P204','8880000018','2025-06-12 15:22:53'),(506,'9302840287','P204','8880000019','2025-06-12 15:22:53'),(507,'9302840287','P204','8880000020','2025-06-12 15:22:53'),(508,'9302840287','P204','8880000021','2025-06-12 15:22:53'),(509,'9302840287','P204','8880000022','2025-06-12 15:22:53'),(510,'9302840287','P204','8880000023','2025-06-12 15:22:53'),(511,'9302840287','P204','8880000024','2025-06-12 15:22:53'),(512,'9302840287','P204','8880000025','2025-06-12 15:22:53'),(513,'9302840287','P204','8880000026','2025-06-12 15:22:53'),(514,'9302840287','P204','8880000027','2025-06-12 15:22:53'),(515,'9302840287','P204','8880000028','2025-06-12 15:22:53'),(516,'9302840287','P204','8880000029','2025-06-12 15:22:53'),(517,'9302840287','P204','8880000030','2025-06-12 15:22:53'),(518,'9302840287','P204','8880000031','2025-06-12 15:22:53'),(519,'9302840287','P204','8880000032','2025-06-12 15:22:53'),(520,'9302840287','P204','8880000033','2025-06-12 15:22:53'),(521,'9302840287','P204','8880000034','2025-06-12 15:22:53'),(522,'9302840287','P204','8880000035','2025-06-12 15:22:53'),(523,'9302840287','P204','8880000036','2025-06-12 15:22:53'),(524,'9302840287','P204','8880000037','2025-06-12 15:22:53'),(525,'9302840287','P204','8880000038','2025-06-12 15:22:53'),(526,'9302840287','P204','8880000039','2025-06-12 15:22:53'),(527,'9302840287','P204','8880000040','2025-06-12 15:22:53'),(528,'9302840287','P210','9302841234','2025-06-12 16:15:52'),(531,'9302840287','P204','9302840287','2025-06-13 00:11:04'),(538,'9302840286','P202','9302840287','2025-06-19 14:00:51'),(544,'9302840287','P204','6260798400','2025-06-22 04:01:15'),(546,'9098678093','P999','9302840287','2025-06-22 04:50:14'),(552,'9302840287','P210','8878447714','2025-06-23 11:15:44'),(559,'9302840287','P335','8878447714','2025-06-23 15:28:23'),(565,'7897897890','P203','6260798400','2025-06-26 11:42:26'),(566,'9302840286','P202','6260798400','2025-06-27 17:01:43');
/*!40000 ALTER TABLE `notification_buyer_inquiry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property_categories`
--

DROP TABLE IF EXISTS `property_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `property_category` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `property_category` (`property_category`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property_categories`
--

LOCK TABLES `property_categories` WRITE;
/*!40000 ALTER TABLE `property_categories` DISABLE KEYS */;
INSERT INTO `property_categories` VALUES (2,'Commercial'),(3,'Luxury'),(1,'Residential'),(4,'Retail');
/*!40000 ALTER TABLE `property_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property_details`
--

DROP TABLE IF EXISTS `property_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property_details` (
  `property_number` varchar(20) NOT NULL,
  `mobile` varchar(10) NOT NULL,
  `property_type` varchar(50) NOT NULL,
  `categories` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `nearby` varchar(255) DEFAULT NULL,
  `photos` json DEFAULT NULL,
  `status` enum('Available','Sold','Pending') DEFAULT 'Available',
  `description` text,
  `area` varchar(50) DEFAULT NULL,
  `price` decimal(15,2) DEFAULT NULL,
  `post_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `ownership` varchar(50) DEFAULT NULL,
  `purpose` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`property_number`),
  KEY `fk_mobile` (`mobile`),
  CONSTRAINT `fk_mobile` FOREIGN KEY (`mobile`) REFERENCES `seller` (`mobile`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chk_price_positive` CHECK ((`price` >= 0)),
  CONSTRAINT `chk_status_enum` CHECK ((`status` in (_utf8mb4'Available',_utf8mb4'Sold',_utf8mb4'Pending')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property_details`
--

LOCK TABLES `property_details` WRITE;
/*!40000 ALTER TABLE `property_details` DISABLE KEYS */;
INSERT INTO `property_details` VALUES ('P201','9302840287','House','Luxury','Madhya Pradesh','Bhopal','Karond','Hanuman Mandir','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\", \"mb0ra7njdsc8.jpg\", \"mb0ra7nkscc1.jpg\", \"mb0ra7oa0sdr.jpg\", \"mb0ra7oa7eem.jpg\"]','Available','8BHK House with beautiful garden and swimming pool and also available ground','4400 sq.ft',9200.00,'2025-06-01 11:30:00','Freehold','Sale'),('P202','9302840286','Villa','Residential','Madhya Pradesh','Indore','Vijay nagar','Temple','[\"mbhr3psvu4b8.jpg\", \"mbhr3ptridyy.jpg\", \"mbhr3ptrn16u.jpg\", \"mbhr3ptr6st3.jpg\", \"mbhr3ptsnr39.jpg\", \"mbhr3ptsy0k6.jpg\"]','Available','4BHK beautiful villa with modern amenities','1850 sq.m',95.00,'2025-06-02 14:15:00','Freehold','Commercial Use'),('P203','7897897890','Apartment','Commercial','Uttar Pradesh','Noida','Hanuman Chauraha','D-Mart','[\"mbgho77ane3z.jpg\", \"mbgho77eoftz.jpg\", \"mbgho77f6p08.jpg\", \"mbgho77f16p3.jpg\", \"mbgho77gj2nd.jpg\"]','Available','A beautiful apartment with large space','5850 sq.yd',95.00,'2025-06-03 10:20:00','Leasehold','Commercial Use'),('P204','9302840287','Farmhouse','Commercial,Luxury','Madhya Pradesh','Bhopal','Kolar','D-Mart','[\"mb0rhxe4tg0i.jpg\", \"mb0rhxe5cc33.jpg\", \"mb0rhxe5y373.jpg\", \"mb0rhxe643yp.jpg\"]','Available','A beautiful house with garden and ground','5550 sq.ft',820.00,'2025-06-03 16:45:00','Freehold','Rent'),('P205','9302840286','Commercial Space','Commercial','Madhya Pradesh','Bhopal','Karond','JNCT College','[\"mb2qs7azdeup.jpg\", \"mb2qs7c4avr7.jpg\", \"mb2qs7c516xe.jpg\", \"mb2qs7c5zxfi.jpg\", \"mb2qs7c5pozr.jpg\", \"mb2qs7c59nys.jpg\"]','Available','Prime commercial space with ample parking','2850 sq.m',8100.00,'2025-06-04 09:10:00','Other','Commercial Use'),('P206','7897897890','House','Residential','Madhya Pradesh','Bhopal','Karond','JNCT College','[\"mb41mfb0pvpn.jpg\", \"mb41mfblod6f.jpg\", \"mb41mfbltya5.jpg\", \"mb41mfbodenp.jpg\", \"mb41mfbotgvf.jpg\", \"mb41mfbo4i3e.jpg\"]','Sold','4BHK with garden and ground','1200 sq.ft',9000.00,'2025-06-04 12:00:00','Other','Sale'),('P207','9302840287','Penthouse','Commercial','Madhya Pradesh','Bhopal','MP Nagar','Temple','[\"mb7i6bo09hc9.jpg\", \"mb7i6botk5a6.jpg\", \"mb7i6bou7r0o.jpg\", \"mb7i6bou9ilt.jpg\", \"mb7i6bou967k.jpg\", \"mb7i6boutt7z.jpg\", \"mb7i6boyfo9c.jpg\"]','Available','Luxury penthouse with modern design','1850 sq.yd',8100.00,'2025-06-05 15:00:00','Freehold','Commercial Use'),('P208','9302840286','Studio','Commercial','Rajasthan','Jaipur','MP Nagar','Hanuman Mandir','[\"mbgeb8raw4zg.jpg\", \"mbgeb8s07whj.jpg\", \"mbgeb8s1b8mi.jpg\", \"mbgeb8s1ou2a.jpg\", \"mbgeb8s1bjc9.jpg\"]','Available','Spacious studio apartment with amenities','1820 sq.m',95.00,'2025-06-05 17:20:00','Freehold','Rent'),('P209','7897897890','Farmhouse','Luxury','Madhya Pradesh','Bhopal','Karond','Hanuman Mandir','[\"mbexn67nad3v.jpg\", \"mbexn6822y7w.jpg\", \"mbexn682xmpp.jpg\", \"mbexn6852vsr.jpg\", \"mbexn685gb1t.jpg\", \"mbexn686a5ia.jpg\"]','Available','Beautiful farmhouse with all facilities','9850 sq.ft',2.00,'2025-06-06 09:30:00','Freehold','Sale'),('P210','9302840287','Penthouse','Commercial','Bihar','Patna','Hanuman Chauraha','D-Mart','[\"mbhtdeqnsvsz.jpg\"]','Available','Luxury penthouse with large space','1850 sq.yd',85.00,'2025-06-06 14:00:00','Leasehold','Commercial Use'),('P211','9302840286','Plot','Residential','MP','Guna','Hanuman Chauraha','Temple','[]','Available','Large plot near main market','1850 sq.m',900.00,'2025-06-07 10:00:00','Freehold','Sale'),('P212','7897897890','Plot','Commercial','RJ','Jaisalmer','Hanuman Chauraha','D-Mart','[\"mbj3vzkexck6.jpg\", \"mbj3vzkxl2dx.jpg\", \"mbj3vzkxvkn3.jpg\", \"mbj3vzkyp5e9.jpg\", \"mbj3vzkztilf.jpg\"]','Available','Commercial plot near main market','1850 sq.ft',8900.00,'2025-06-07 15:30:00','Freehold','Commercial Use'),('P213','9302840287','House','Commercial','Bihar','Patna','Hanuman Chauraha','D-Mart','[\"mbj44ua6pkqc.jpg\", \"mbj44ua7u3yi.jpg\", \"mbj44ua7fitt.jpg\", \"mbj44ua764r6.jpg\", \"mbj44ua9da9w.jpg\"]','Available','4BHK house with large space','1850 sq.m',9050.00,'2025-06-07 18:00:00','Freehold','Commercial Use'),('P214','9302840286','House','Residential','Madhya Pradesh','Bhopal','Karond','JNCT College','[\"mbj4f3d0i1t4.jpg\", \"mbj4f3d16gh9.jpg\", \"mbj4f3d3u4dd.jpg\", \"mbj4f3d4rgry.jpg\", \"mbj4f3d40bzr.jpg\"]','Available','4BHK house with all facilities','1850 sq.ft',920.00,'2025-06-08 09:45:00','Freehold','Sale'),('P215','7897897890','Villa','Residential','Madhya Pradesh','Indore','Vijay Nagar','Temple','[\"mbhr3psvu4b8.jpg\", \"mbhr3ptridyy.jpg\", \"mbhr3ptrn16u.jpg\", \"mbhr3ptr6st3.jpg\", \"mbhr3ptsnr39.jpg\", \"mbhr3ptsy0k6.jpg\"]','Available','Spacious villa with garden','1850 sq.m',100.00,'2025-06-08 14:10:00','Freehold','Commercial Use'),('P216','9302840287','Apartment','Commercial','Uttar Pradesh','Noida','Hanuman Chauraha','D-Mart','[\"mbgho77ane3z.jpg\", \"mbgho77eoftz.jpg\", \"mbgho77f6p08.jpg\", \"mbgho77f16p3.jpg\", \"mbgho77gj2nd.jpg\"]','Available','Modern apartment with parking','5850 sq.yd',95.00,'2025-06-08 17:00:00','Leasehold','Commercial Use'),('P217','9302840286','Farmhouse','Luxury','Madhya Pradesh','Bhopal','Kolar','D-Mart','[\"mb0rhxe4tg0i.jpg\", \"mb0rhxe5cc33.jpg\", \"mb0rhxe5y373.jpg\", \"mb0rhxe643yp.jpg\"]','Available','Large farmhouse with garden','5550 sq.ft',800.00,'2025-06-09 10:30:00','Freehold','Rent'),('P218','7897897890','Commercial Space','Commercial','Madhya Pradesh','Bhopal','Karond','JNCT College','[\"mb2qs7azdeup.jpg\", \"mb2qs7c4avr7.jpg\", \"mb2qs7c516xe.jpg\", \"mb2qs7c5zxfi.jpg\", \"mb2qs7c5pozr.jpg\", \"mb2qs7c59nys.jpg\"]','Available','Prime commercial space','2850 sq.m',8000.00,'2025-06-09 15:20:00','Other','Commercial Use'),('P219','9302840287','House','Residential','Madhya Pradesh','Bhopal','Karond','JNCT College','[\"mb41mfb0pvpn.jpg\", \"mb41mfblod6f.jpg\", \"mb41mfbltya5.jpg\", \"mb41mfbodenp.jpg\", \"mb41mfbotgvf.jpg\", \"mb41mfbo4i3e.jpg\"]','Available','Comfortable 4BHK house','1200 sq.ft',9000.00,'2025-06-10 11:00:00','Other','Sale'),('P220','9302840286','Penthouse','Commercial','Madhya Pradesh','Bhopal','MP Nagar','Temple','[\"mb7i6bo09hc9.jpg\", \"mb7i6botk5a6.jpg\", \"mb7i6bou7r0o.jpg\", \"mb7i6bou9ilt.jpg\", \"mb7i6bou967k.jpg\", \"mb7i6boutt7z.jpg\", \"mb7i6boyfo9c.jpg\"]','Available','Modern penthouse with luxury amenities','1850 sq.yd',8200.00,'2025-06-10 16:00:00','Freehold','Commercial Use'),('P221','9302840287','House','Luxury','Madhya Pradesh','Bhopal','Karond','Hanuman Mandir','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\", \"mb0ra7njdsc8.jpg\", \"mb0ra7nkscc1.jpg\", \"mb0ra7oa0sdr.jpg\", \"mb0ra7oa7eem.jpg\"]','Available','Spacious 8BHK house with garden and pool','4400 sq.ft',9250.00,'2025-06-11 10:00:00','Freehold','Sale'),('P222','9302840286','Villa','Residential','Madhya Pradesh','Indore','Vijay Nagar','Temple','[\"mbhr3psvu4b8.jpg\", \"mbhr3ptridyy.jpg\", \"mbhr3ptrn16u.jpg\", \"mbhr3ptr6st3.jpg\", \"mbhr3ptsnr39.jpg\", \"mbhr3ptsy0k6.jpg\"]','Available','Modern 4BHK villa with ample parking','1850 sq.m',100.00,'2025-06-11 12:30:00','Freehold','Commercial Use'),('P223','7897897890','Apartment','Commercial','Uttar Pradesh','Noida','Hanuman Chauraha','D-Mart','[\"mbgho77ane3z.jpg\", \"mbgho77eoftz.jpg\", \"mbgho77f6p08.jpg\", \"mbgho77f16p3.jpg\", \"mbgho77gj2nd.jpg\"]','Available','3BHK apartment near D-Mart and park','5850 sq.yd',95.00,'2025-06-12 09:15:00','Leasehold','Commercial Use'),('P224','9302840287','Farmhouse','Luxury','Madhya Pradesh','Bhopal','Kolar','D-Mart','[\"mb0rhxe4tg0i.jpg\", \"mb0rhxe5cc33.jpg\", \"mb0rhxe5y373.jpg\", \"mb0rhxe643yp.jpg\"]','Available','Farmhouse with garden and pond','5550 sq.ft',850.00,'2025-06-12 13:45:00','Freehold','Rent'),('P225','9302840286','Commercial Space','Commercial','Madhya Pradesh','Bhopal','Karond','JNCT College','[\"mb2qs7azdeup.jpg\", \"mb2qs7c4avr7.jpg\", \"mb2qs7c516xe.jpg\", \"mb2qs7c5zxfi.jpg\", \"mb2qs7c5pozr.jpg\", \"mb2qs7c59nys.jpg\"]','Available','Prime commercial office space','2850 sq.m',8150.00,'2025-06-13 08:30:00','Other','Commercial Use'),('P226','7897897890','House','Residential','Madhya Pradesh','Bhopal','Karond','JNCT College','[\"mb41mfb0pvpn.jpg\", \"mb41mfblod6f.jpg\", \"mb41mfbltya5.jpg\", \"mb41mfbodenp.jpg\", \"mb41mfbotgvf.jpg\", \"mb41mfbo4i3e.jpg\"]','Sold','4BHK cozy home with parking','1200 sq.ft',9050.00,'2025-06-13 11:00:00','Other','Sale'),('P227','9302840287','Penthouse','Commercial','Madhya Pradesh','Bhopal','MP Nagar','Temple','[\"mb7i6bo09hc9.jpg\", \"mb7i6botk5a6.jpg\", \"mb7i6bou7r0o.jpg\", \"mb7i6bou9ilt.jpg\", \"mb7i6bou967k.jpg\", \"mb7i6boutt7z.jpg\", \"mb7i6boyfo9c.jpg\"]','Available','Luxury penthouse with city view','1850 sq.yd',8200.00,'2025-06-14 14:30:00','Freehold','Commercial Use'),('P228','9302840286','Studio','Commercial','Rajasthan','Jaipur','MP Nagar','Hanuman Mandir','[\"mbgeb8raw4zg.jpg\", \"mbgeb8s07whj.jpg\", \"mbgeb8s1b8mi.jpg\", \"mbgeb8s1ou2a.jpg\", \"mbgeb8s1bjc9.jpg\"]','Available','Modern studio apartment','1820 sq.m',100.00,'2025-06-14 17:20:00','Freehold','Rent'),('P229','7897897890','Farmhouse','Luxury','Madhya Pradesh','Bhopal','Karond','Hanuman Mandir','[\"mbexn67nad3v.jpg\", \"mbexn6822y7w.jpg\", \"mbexn682xmpp.jpg\", \"mbexn6852vsr.jpg\", \"mbexn685gb1t.jpg\", \"mbexn686a5ia.jpg\"]','Available','Spacious farmhouse with all facilities','9850 sq.ft',2.00,'2025-06-15 09:00:00','Freehold','Sale'),('P230','9302840287','Penthouse','Commercial','Bihar','Patna','Hanuman Chauraha','D-Mart','[\"mbhtdeqnsvsz.jpg\"]','Available','Luxury penthouse with rooftop','1850 sq.yd',85.00,'2025-06-15 13:30:00','Leasehold','Commercial Use'),('P231','9302840286','Plot','Residential','MP','Guna','Hanuman Chauraha','Temple','[]','Available','Open plot near temple','1850 sq.m',890.00,'2025-06-16 10:15:00','Freehold','Sale'),('P232','7897897890','Plot','Commercial','RJ','Jaisalmer','Hanuman Chauraha','D-Mart','[\"mbj3vzkexck6.jpg\", \"mbj3vzkxl2dx.jpg\", \"mbj3vzkxvkn3.jpg\", \"mbj3vzkyp5e9.jpg\", \"mbj3vzkztilf.jpg\"]','Available','Commercial plot near market','1850 sq.ft',8750.00,'2025-06-16 14:00:00','Freehold','Commercial Use'),('P233','9302840287','House','Commercial','Bihar','Patna','Hanuman Chauraha','D-Mart','[\"mbj44ua6pkqc.jpg\", \"mbj44ua7u3yi.jpg\", \"mbj44ua7fitt.jpg\", \"mbj44ua764r6.jpg\", \"mbj44ua9da9w.jpg\"]','Available','4BHK house close to market','1850 sq.m',9000.00,'2025-06-16 17:45:00','Freehold','Commercial Use'),('P234','9302840286','House','Residential','Madhya Pradesh','Bhopal','Karond','JNCT College','[\"mbj4f3d0i1t4.jpg\", \"mbj4f3d16gh9.jpg\", \"mbj4f3d3u4dd.jpg\", \"mbj4f3d4rgry.jpg\", \"mbj4f3d40bzr.jpg\"]','Available','Cozy 4BHK house with garden','1850 sq.ft',920.00,'2025-06-17 11:00:00','Freehold','Sale'),('P235','7897897890','Villa','Residential','Madhya Pradesh','Indore','Vijay Nagar','Temple','[\"mbhr3psvu4b8.jpg\", \"mbhr3ptridyy.jpg\", \"mbhr3ptrn16u.jpg\", \"mbhr3ptr6st3.jpg\", \"mbhr3ptsnr39.jpg\", \"mbhr3ptsy0k6.jpg\"]','Available','Elegant villa with modern amenities','1850 sq.m',110.00,'2025-06-17 14:30:00','Freehold','Commercial Use'),('P236','9302840287','Apartment','Commercial','Uttar Pradesh','Noida','Hanuman Chauraha','D-Mart','[\"mbgho77ane3z.jpg\", \"mbgho77eoftz.jpg\", \"mbgho77f6p08.jpg\", \"mbgho77f16p3.jpg\", \"mbgho77gj2nd.jpg\"]','Available','Apartment with parking and garden','5850 sq.yd',100.00,'2025-06-18 09:00:00','Leasehold','Commercial Use'),('P237','9302840286','Farmhouse','Luxury','Madhya Pradesh','Bhopal','Kolar','D-Mart','[\"mb0rhxe4tg0i.jpg\", \"mb0rhxe5cc33.jpg\", \"mb0rhxe5y373.jpg\", \"mb0rhxe643yp.jpg\"]','Available','Farmhouse with open space','5550 sq.ft',820.00,'2025-06-18 12:00:00','Freehold','Rent'),('P238','7897897890','Commercial Space','Commercial','Madhya Pradesh','Bhopal','Karond','JNCT College','[\"mb2qs7azdeup.jpg\", \"mb2qs7c4avr7.jpg\", \"mb2qs7c516xe.jpg\", \"mb2qs7c5zxfi.jpg\", \"mb2qs7c5pozr.jpg\", \"mb2qs7c59nys.jpg\"]','Available','Commercial office with facilities','2850 sq.m',8500.00,'2025-06-19 10:00:00','Other','Commercial Use'),('P239','9302840287','House','Residential','Madhya Pradesh','Bhopal','Karond','JNCT College','[\"mb41mfb0pvpn.jpg\", \"mb41mfblod6f.jpg\", \"mb41mfbltya5.jpg\", \"mb41mfbodenp.jpg\", \"mb41mfbotgvf.jpg\", \"mb41mfbo4i3e.jpg\"]','Available','Comfortable 4BHK house','1200 sq.ft',9100.00,'2025-06-19 13:30:00','Other','Sale'),('P240','9302840286','Penthouse','Commercial','Madhya Pradesh','Bhopal','MP Nagar','Temple','[\"mb7i6bo09hc9.jpg\", \"mb7i6botk5a6.jpg\", \"mb7i6bou7r0o.jpg\", \"mb7i6bou9ilt.jpg\", \"mb7i6bou967k.jpg\", \"mb7i6boutt7z.jpg\", \"mb7i6boyfo9c.jpg\"]','Available','Penthouse with panoramic city views','1850 sq.yd',8300.00,'2025-06-20 15:00:00','Freehold','Commercial Use'),('P241','9302840287','House','Residential','Madhya Pradesh','Bhopal','Karond','Hanuman Mandir','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\", \"mb0ra7njdsc8.jpg\", \"mb0ra7nkscc1.jpg\", \"mb0ra7oa0sdr.jpg\", \"mb0ra7oa7eem.jpg\"]','Available','Modern 8BHK house with pool','4400 sq.ft',9400.00,'2025-06-20 18:30:00','Freehold','Sale'),('P242','9302840286','Villa','Residential','Madhya Pradesh','Indore','Vijay Nagar','Temple','[\"mbhr3psvu4b8.jpg\", \"mbhr3ptridyy.jpg\", \"mbhr3ptrn16u.jpg\", \"mbhr3ptr6st3.jpg\", \"mbhr3ptsnr39.jpg\", \"mbhr3ptsy0k6.jpg\"]','Available','Elegant villa with garden','1850 sq.m',105.00,'2025-06-21 09:00:00','Freehold','Commercial Use'),('P243','7897897890','Apartment','Commercial','Uttar Pradesh','Noida','Hanuman Chauraha','D-Mart','[\"mbgho77ane3z.jpg\", \"mbgho77eoftz.jpg\", \"mbgho77f6p08.jpg\", \"mbgho77f16p3.jpg\", \"mbgho77gj2nd.jpg\"]','Available','3BHK apartment near amenities','5850 sq.yd',98.00,'2025-06-21 12:30:00','Leasehold','Commercial Use'),('P244','9302840287','Farmhouse','Luxury','Madhya Pradesh','Bhopal','Kolar','D-Mart','[\"mb0rhxe4tg0i.jpg\", \"mb0rhxe5cc33.jpg\", \"mb0rhxe5y373.jpg\", \"mb0rhxe643yp.jpg\"]','Available','Large farmhouse with garden','5550 sq.ft',860.00,'2025-06-22 14:45:00','Freehold','Rent'),('P245','9302840286','Commercial Space','Commercial','Madhya Pradesh','Bhopal','Karond','JNCT College','[\"mb2qs7azdeup.jpg\", \"mb2qs7c4avr7.jpg\", \"mb2qs7c516xe.jpg\", \"mb2qs7c5zxfi.jpg\", \"mb2qs7c5pozr.jpg\", \"mb2qs7c59nys.jpg\"]','Available','Office space with parking','2850 sq.m',8200.00,'2025-06-22 17:00:00','Other','Commercial Use'),('P246','7897897890','House','Residential','Madhya Pradesh','Bhopal','Karond','JNCT College','[\"mb41mfb0pvpn.jpg\", \"mb41mfblod6f.jpg\", \"mb41mfbltya5.jpg\", \"mb41mfbodenp.jpg\", \"mb41mfbotgvf.jpg\", \"mb41mfbo4i3e.jpg\"]','Available','Cozy 4BHK with garden','1200 sq.ft',9150.00,'2025-06-23 11:00:00','Other','Sale'),('P247','9302840287','Penthouse','Commercial','Madhya Pradesh','Bhopal','MP Nagar','Temple','[\"mb7i6bo09hc9.jpg\", \"mb7i6botk5a6.jpg\", \"mb7i6bou7r0o.jpg\", \"mb7i6bou9ilt.jpg\", \"mb7i6bou967k.jpg\", \"mb7i6boutt7z.jpg\", \"mb7i6boyfo9c.jpg\"]','Available','Luxury penthouse near downtown','1850 sq.yd',8350.00,'2025-06-23 15:30:00','Freehold','Commercial Use'),('P248','9302840286','Studio','Commercial','Rajasthan','Jaipur','MP Nagar','Hanuman Mandir','[\"mbgeb8raw4zg.jpg\", \"mbgeb8s07whj.jpg\", \"mbgeb8s1b8mi.jpg\", \"mbgeb8s1ou2a.jpg\", \"mbgeb8s1bjc9.jpg\"]','Available','Compact studio apartment','1820 sq.m',98.00,'2025-06-24 10:00:00','Freehold','Rent'),('P249','7897897890','Farmhouse','Luxury','Madhya Pradesh','Bhopal','Karond','Hanuman Mandir','[\"mbexn67nad3v.jpg\", \"mbexn6822y7w.jpg\", \"mbexn682xmpp.jpg\", \"mbexn6852vsr.jpg\", \"mbexn685gb1t.jpg\", \"mbexn686a5ia.jpg\"]','Available','Spacious farmhouse with pool','9850 sq.ft',3.00,'2025-06-24 13:30:00','Freehold','Sale'),('P250','9302840287','Penthouse','Commercial','Bihar','Patna','Hanuman Chauraha','D-Mart','[\"mbhtdeqnsvsz.jpg\"]','Available','Luxury penthouse with rooftop garden','1850 sq.yd',88.00,'2025-06-25 10:00:00','Leasehold','Commercial Use'),('P251','9302840286','House','Residential','Madhya Pradesh','Bhopal','Karond','Hanuman Mandir','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\", \"mb0ra7njdsc8.jpg\", \"mb0ra7nkscc1.jpg\"]','Available','6BHK house with modern interiors','3600 sq.ft',9200.00,'2025-06-25 11:30:00','Freehold','Sale'),('P252','7897897890','Villa','Luxury','Madhya Pradesh','Indore','Vijay Nagar','Temple','[\"mbhr3psvu4b8.jpg\", \"mbhr3ptridyy.jpg\", \"mbhr3ptrn16u.jpg\"]','Available','Elegant 5BHK villa with pool','2200 sq.m',115.00,'2025-06-25 14:00:00','Freehold','Sale'),('P253','9302840287','Apartment','Commercial','Uttar Pradesh','Noida','Sector 62','D-Mart','[\"mbgho77ane3z.jpg\", \"mbgho77eoftz.jpg\", \"mbgho77f6p08.jpg\"]','Available','2BHK apartment near metro','850 sq.ft',85.00,'2025-06-26 09:00:00','Leasehold','Rent'),('P254','9302840286','Farmhouse','Luxury','Madhya Pradesh','Bhopal','Kolar','D-Mart','[\"mb0rhxe4tg0i.jpg\", \"mb0rhxe5cc33.jpg\", \"mb0rhxe5y373.jpg\"]','Available','Farmhouse with orchard','6500 sq.ft',880.00,'2025-06-26 12:30:00','Freehold','Sale'),('P255','7897897890','Commercial Space','Commercial','Madhya Pradesh','Bhopal','Karond','JNCT College','[\"mb2qs7azdeup.jpg\", \"mb2qs7c4avr7.jpg\", \"mb2qs7c516xe.jpg\"]','Available','Office space with high-speed internet','1500 sq.m',8300.00,'2025-06-27 10:00:00','Other','Commercial Use'),('P256','9302840287','House','Residential','Madhya Pradesh','Bhopal','Karond','JNCT College','[\"mb41mfb0pvpn.jpg\", \"mb41mfblod6f.jpg\", \"mb41mfbltya5.jpg\"]','Sold','3BHK house with parking','1250 sq.ft',8900.00,'2025-06-27 15:00:00','Other','Sale'),('P257','9302840286','Penthouse','Commercial','Madhya Pradesh','Bhopal','MP Nagar','Temple','[\"mb7i6bo09hc9.jpg\", \"mb7i6botk5a6.jpg\", \"mb7i6bou7r0o.jpg\"]','Available','Penthouse with skyline views','1800 sq.yd',8700.00,'2025-06-28 11:00:00','Freehold','Commercial Use'),('P258','9302840287','Studio','Commercial','Rajasthan','Jaipur','MP Nagar','Hanuman Mandir','[\"mbgeb8raw4zg.jpg\", \"mbgeb8s07whj.jpg\", \"mbgeb8s1b8mi.jpg\"]','Available','Compact studio with balcony','450 sq.ft',50.00,'2025-06-28 13:00:00','Freehold','Rent'),('P259','7897897890','Farmhouse','Luxury','Madhya Pradesh','Bhopal','Karond','Hanuman Mandir','[\"mbexn67nad3v.jpg\", \"mbexn6822y7w.jpg\", \"mbexn682xmpp.jpg\"]','Available','Farmhouse with water pond','7200 sq.ft',900.00,'2025-06-29 10:30:00','Freehold','Sale'),('P260','9302840287','Penthouse','Commercial','Bihar','Patna','Hanuman Chauraha','D-Mart','[\"mbhtdeqnsvsz.jpg\"]','Available','Rooftop penthouse with garden','1800 sq.yd',880.00,'2025-06-29 12:45:00','Leasehold','Commercial Use'),('P261','9302840286','Plot','Residential','MP','Guna','Hanuman Chauraha','Temple','[]','Available','Open residential plot','1500 sq.m',900.00,'2025-06-30 10:00:00','Freehold','Sale'),('P262','7897897890','Plot','Commercial','RJ','Jaisalmer','Hanuman Chauraha','D-Mart','[\"mbj3vzkexck6.jpg\", \"mbj3vzkxl2dx.jpg\", \"mbj3vzkxvkn3.jpg\"]','Available','Commercial plot near highway','2000 sq.ft',920.00,'2025-06-30 14:00:00','Freehold','Commercial Use'),('P263','9302840287','House','Commercial','Bihar','Patna','Hanuman Chauraha','D-Mart','[\"mbj44ua6pkqc.jpg\", \"mbj44ua7u3yi.jpg\", \"mbj44ua7fitt.jpg\"]','Available','4BHK house for office use','1600 sq.ft',8600.00,'2025-07-01 09:00:00','Freehold','Commercial Use'),('P264','9302840286','House','Residential','Madhya Pradesh','Bhopal','Karond','JNCT College','[\"mbj4f3d0i1t4.jpg\", \"mbj4f3d16gh9.jpg\", \"mbj4f3d3u4dd.jpg\"]','Available','Cozy family home','1300 sq.ft',9200.00,'2025-07-01 11:30:00','Freehold','Sale'),('P265','7897897890','Villa','Residential','Madhya Pradesh','Indore','Vijay Nagar','Temple','[\"mbhr3psvu4b8.jpg\", \"mbhr3ptridyy.jpg\", \"mbhr3ptrn16u.jpg\"]','Available','Spacious villa with garden','2400 sq.m',120.00,'2025-07-02 10:00:00','Freehold','Sale'),('P266','9302840287','Apartment','Commercial','Uttar Pradesh','Noida','Hanuman Chauraha','D-Mart','[\"mbgho77ane3z.jpg\", \"mbgho77eoftz.jpg\", \"mbgho77f6p08.jpg\"]','Available','2BHK apartment near amenities','950 sq.ft',90.00,'2025-07-02 13:00:00','Leasehold','Rent'),('P267','9302840286','Farmhouse','Luxury','Madhya Pradesh','Bhopal','Kolar','D-Mart','[\"mb0rhxe4tg0i.jpg\", \"mb0rhxe5cc33.jpg\", \"mb0rhxe5y373.jpg\"]','Available','Farmhouse with orchard','6800 sq.ft',870.00,'2025-07-03 10:00:00','Freehold','Sale'),('P268','7897897890','Commercial Space','Commercial','Madhya Pradesh','Bhopal','Karond','JNCT College','[\"mb2qs7azdeup.jpg\", \"mb2qs7c4avr7.jpg\", \"mb2qs7c516xe.jpg\"]','Available','Office space near market','1650 sq.m',8400.00,'2025-07-03 15:00:00','Other','Commercial Use'),('P269','9302840287','House','Residential','Madhya Pradesh','Bhopal','Karond','JNCT College','[\"mb41mfb0pvpn.jpg\", \"mb41mfblod6f.jpg\", \"mb41mfbltya5.jpg\"]','Available','3BHK house with parking','1350 sq.ft',9000.00,'2025-07-04 09:00:00','Other','Sale'),('P270','9302840286','Penthouse','Commercial','Madhya Pradesh','Bhopal','MP Nagar','Temple','[\"mb7i6bo09hc9.jpg\", \"mb7i6botk5a6.jpg\", \"mb7i6bou7r0o.jpg\"]','Available','Penthouse with city view','1900 sq.yd',8750.00,'2025-07-04 12:30:00','Freehold','Commercial Use'),('P271','9302840287','House','Residential','Madhya Pradesh','Bhopal','Karond','Hanuman Mandir','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\", \"mb0ra7njdsc8.jpg\"]','Available','Modern 7BHK house with garden','4200 sq.ft',9300.00,'2025-07-05 10:30:00','Freehold','Sale'),('P272','9302840286','Villa','Residential','Madhya Pradesh','Indore','Vijay Nagar','Temple','[\"mbhr3psvu4b8.jpg\", \"mbhr3ptridyy.jpg\", \"mbhr3ptrn16u.jpg\"]','Available','Elegant villa with pool','2250 sq.m',110.00,'2025-07-05 14:00:00','Freehold','Sale'),('P273','7897897890','Apartment','Commercial','Uttar Pradesh','Noida','Hanuman Chauraha','D-Mart','[\"mbgho77ane3z.jpg\", \"mbgho77eoftz.jpg\", \"mbgho77f6p08.jpg\"]','Available','3BHK apartment near park','1000 sq.ft',95.00,'2025-07-06 09:00:00','Leasehold','Rent'),('P274','9302840287','Farmhouse','Luxury','Madhya Pradesh','Bhopal','Kolar','D-Mart','[\"mb0rhxe4tg0i.jpg\", \"mb0rhxe5cc33.jpg\", \"mb0rhxe5y373.jpg\"]','Available','Spacious farmhouse with orchard','7200 sq.ft',890.00,'2025-07-06 13:00:00','Freehold','Sale'),('P275','9302840286','Commercial Space','Commercial','Madhya Pradesh','Bhopal','Karond','JNCT College','[\"mb2qs7azdeup.jpg\", \"mb2qs7c4avr7.jpg\", \"mb2qs7c516xe.jpg\"]','Available','Office space with parking','1700 sq.m',8600.00,'2025-07-07 11:00:00','Other','Commercial Use'),('P276','7897897890','House','Residential','Madhya Pradesh','Bhopal','Karond','JNCT College','[\"mb41mfb0pvpn.jpg\", \"mb41mfblod6f.jpg\", \"mb41mfbltya5.jpg\"]','Available','4BHK house with garden','1400 sq.ft',9200.00,'2025-07-07 15:00:00','Other','Sale'),('P277','9302840287','Penthouse','Commercial','Madhya Pradesh','Bhopal','MP Nagar','Temple','[\"mb7i6bo09hc9.jpg\", \"mb7i6botk5a6.jpg\", \"mb7i6bou7r0o.jpg\"]','Available','Penthouse with skyline view','1950 sq.yd',8800.00,'2025-07-08 10:00:00','Freehold','Commercial Use'),('P278','9302840286','Studio','Commercial','Rajasthan','Jaipur','MP Nagar','Hanuman Mandir','[\"mbgeb8raw4zg.jpg\", \"mbgeb8s07whj.jpg\", \"mbgeb8s1b8mi.jpg\"]','Available','Studio apartment with balcony','480 sq.ft',52.00,'2025-07-08 13:00:00','Freehold','Rent'),('P279','7897897890','Farmhouse','Luxury','Madhya Pradesh','Bhopal','Karond','Hanuman Mandir','[\"mbexn67nad3v.jpg\", \"mbexn6822y7w.jpg\", \"mbexn682xmpp.jpg\"]','Available','Farmhouse with swimming pool','7500 sq.ft',920.00,'2025-07-09 11:00:00','Freehold','Sale'),('P301','9302840286','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2025-01-05 10:00:00','Freehold','Sale'),('P302','9302840286','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2025-02-05 10:00:00','Freehold','Sale'),('P303','9302840286','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2025-02-05 10:00:00','Freehold','Sale'),('P304','9302840286','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2025-02-05 10:00:00','Freehold','Sale'),('P305','9302840286','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2025-02-05 10:00:00','Freehold','Sale'),('P306','9302840286','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2025-02-05 10:00:00','Freehold','Sale'),('P307','9302840286','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2025-02-05 10:00:00','Freehold','Sale'),('P308','9302840286','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2025-02-05 10:00:00','Freehold','Sale'),('P309','9302840286','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2025-02-05 10:00:00','Freehold','Sale'),('P310','9302840286','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2025-02-05 10:00:00','Freehold','Sale'),('P311','9302840286','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2025-02-05 10:00:00','Freehold','Sale'),('P312','9302840286','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2025-02-05 10:00:00','Freehold','Sale'),('P313','9302840286','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2025-02-05 10:00:00','Freehold','Sale'),('P314','9302840286','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2025-03-05 10:00:00','Freehold','Sale'),('P315','9302840286','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2025-03-05 10:00:00','Freehold','Sale'),('P316','9302840286','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2025-03-05 10:00:00','Freehold','Sale'),('P317','9302840286','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2025-03-05 10:00:00','Freehold','Sale'),('P318','9302840286','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2025-03-05 10:00:00','Freehold','Sale'),('P319','9302840286','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2025-03-05 10:00:00','Freehold','Sale'),('P320','9302840286','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2025-03-05 10:00:00','Freehold','Sale'),('P321','9302840286','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2025-03-05 10:00:00','Freehold','Sale'),('P322','9302840286','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2025-03-05 10:00:00','Freehold','Sale'),('P323','9302840287','Guest House','Commercial','Karnataka','Bengaluru','Bengluru','temple','[\"mbzdhytlqtju.jpg\", \"mbzdhytlcqqb.jpg\", \"mbzdhytl16q5.jpg\", \"mbzdhytntsax.jpg\", \"mbzdhytnc38k.jpg\"]','Available','4BHK House  with beautifull garden','900 sq.m',9000.00,'2025-06-16 23:03:25','Freehold','Commercial Use'),('P324','9302840286','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2025-03-05 10:00:00','Freehold','Sale'),('P325','9302840286','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2025-03-05 10:00:00','Freehold','Sale'),('P326','9302840286','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2025-03-05 10:00:00','Freehold','Sale'),('P327','9302840286','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2025-03-05 10:00:00','Freehold','Sale'),('P328','9302840286','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2024-05-05 10:00:00','Freehold','Sale'),('P329','9302840286','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2024-05-05 10:00:00','Freehold','Sale'),('P330','9302840286','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2024-05-05 10:00:00','Freehold','Sale'),('P331','9302840286','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2024-05-05 10:00:00','Freehold','Sale'),('P332','9302840286','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2024-05-05 10:00:00','Freehold','Sale'),('P333','9302840287','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2024-05-05 10:00:00','Freehold','Sale'),('P334','9302840287','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2024-05-05 10:00:00','Freehold','Sale'),('P335','9302840287','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2024-05-05 10:00:00','Freehold','Sale'),('P336','9302840287','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2024-05-05 10:00:00','Freehold','Sale'),('P337','9302840287','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2024-05-05 10:00:00','Freehold','Sale'),('P338','9302840287','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2024-05-05 10:00:00','Freehold','Sale'),('P339','9302840287','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2024-05-05 10:00:00','Freehold','Sale'),('P340','9302840287','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2024-05-05 10:00:00','Freehold','Sale'),('P341','9302840287','House','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',7800.00,'2024-05-05 10:00:00','Freehold','Sale'),('P342','9302840286','Villa','Luxury','Madhya Pradesh','Bhopal','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',177800.00,'2024-05-05 10:00:00','Freehold','Sale'),('P343','9302840286','Apartment','Luxury','Rajasthan','Jodhpur','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',30800.00,'2024-05-05 10:00:00','Freehold','Sale'),('P344','9302840286','Farmhouse','Luxury','Rajasthan','Jodhpur','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',30800.00,'2024-05-05 10:00:00','Freehold','Sale'),('P345','9302840286','Studio','Luxury','Rajasthan','Jodhpur','MP Nagar','Mall','[\"mb0ra7j2429q.jpg\", \"mb0ra7njqv70.jpg\"]','Available','Spacious 3BHK house in MP Nagar.','1200 sq.ft',30800.00,'2024-05-05 10:00:00','Freehold','Sale'),('P999','9098678093','Studio','Luxury','Madhya Pradesh','Indore','Vijay Nagar','Near Mega Mall','[\"mbzdhytlqtju.jpg\", \"mbzdhytlcqqb.jpg\", \"mbzdhytl16q5.jpg\", \"mbzdhytntsax.jpg\", \"mbzdhytnc38k.jpg\"]','Available','3BHK premium apartment with balcony and parking.','1800 sq.ft',1200.00,'2025-06-22 04:48:22','Freehold','Sale');
/*!40000 ALTER TABLE `property_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property_purpose`
--

DROP TABLE IF EXISTS `property_purpose`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property_purpose` (
  `id` int NOT NULL AUTO_INCREMENT,
  `property_purpose` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `property_purpose` (`property_purpose`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property_purpose`
--

LOCK TABLES `property_purpose` WRITE;
/*!40000 ALTER TABLE `property_purpose` DISABLE KEYS */;
INSERT INTO `property_purpose` VALUES (7,'Commercial Use'),(8,'Industrial Use'),(5,'Investment'),(3,'Lease'),(9,'Other'),(4,'PG/Hostel'),(2,'Rent'),(1,'Sale'),(6,'Vacation Home');
/*!40000 ALTER TABLE `property_purpose` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property_types`
--

DROP TABLE IF EXISTS `property_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `property_type` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `property_type` (`property_type`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property_types`
--

LOCK TABLES `property_types` WRITE;
/*!40000 ALTER TABLE `property_types` DISABLE KEYS */;
INSERT INTO `property_types` VALUES (1,'Apartment'),(8,'Commercial Space'),(7,'Farmhouse'),(14,'Guest House'),(2,'House'),(12,'Industrial Land'),(9,'Office'),(15,'Other'),(6,'Penthouse'),(3,'Plot'),(10,'Retail Shop'),(13,'Service Apartment'),(5,'Studio'),(4,'Villa'),(11,'Warehouse');
/*!40000 ALTER TABLE `property_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `rid` varchar(10) NOT NULL,
  `rname` varchar(50) NOT NULL,
  PRIMARY KEY (`rid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES ('r101','Admin'),('r102','HR'),('r103','Software Developer'),('r104','Full Stack Developer'),('r105','Backend Developer'),('r106','Sec Ops');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seller`
--

DROP TABLE IF EXISTS `seller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seller` (
  `full_name` varchar(30) NOT NULL,
  `mobile` varchar(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) DEFAULT NULL,
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`mobile`),
  UNIQUE KEY `email` (`email`),
  CONSTRAINT `chk_email_format` CHECK (regexp_like(`email`,_utf8mb4'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$')),
  CONSTRAINT `chk_mobile` CHECK (regexp_like(`mobile`,_utf8mb4'^[6-9]{1}[0-9]{9}$'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seller`
--

LOCK TABLES `seller` WRITE;
/*!40000 ALTER TABLE `seller` DISABLE KEYS */;
INSERT INTO `seller` VALUES ('Pratibha Patel','6260001094','pratibha.0patel@gmail.com','$2b$10$OVMnVFJaR7nbg5ts.9nLY.HwoNls4HFweBR7wOBYk5nrkANnJrV4a','2025-05-27 17:01:42'),('Prabha Patel','6265786554','patelprabha155@gmail.com','$2b$10$Ke9G8S45H8LZP4nlF392N.7pggzmQvOdj7mOAQw0iW0PpwTSujLfi','2025-05-27 17:00:19'),('Arun Dhakad','7489923858','arundhakad3858@gmail.com','$2b$10$oDH8FSlaWYevEWCimMiqnu8D8ODvYzw.wbyQ2D0lDaS1g70E1Pcx.','2025-06-08 00:27:29'),('Ravi Yadav','7897897890','raviyadav123@gmail.com','$2b$10$P5DAatW0t5I4HTmhz71LnuHd0HWhfxiGIxVUqxi0qSUzzp9QcPg7S','2025-05-13 10:33:18'),('Akshat Tiwari','8304535214','tiwariakshat2023it@gmail.com','$2b$10$W.D53/fC8PikPX0hXT0.3uERCrVdjTzTiDzz1TYdwlvbVWrX.qtHi','2025-06-19 13:22:56'),('Pratibha Sharma','8305821891','sharmamunnu555@gmail.com','$2b$10$x20JWfyPHhzGX/6endF/NuKN8JVKD59cEQ9YkTKqL8YwdPurjmmuG','2025-05-27 16:57:41'),('Hariom Shakya','8878447714','hariomdass9999@gmail.com','$2b$10$.xOfuriu76jLbw8YXg5u4.vcf0W7GbjuTsRctqybdMlOIIhMv2.RO','2025-06-05 19:44:25'),('Divyansh Kamlesh','9090909090','divyansh123@gmail.com','$2b$10$tX2MLjw4ZjK4yEuuYx7BMuqiGIVsUvL76UIHoIEOdkCFhGDPRVIoO','2025-05-21 13:57:13'),('Piyush Saini','9098678093','sainipiyush519@gmail.com','$2b$10$arVDHXgB.teAPKOUnQJ3NuqgcJ4rt7yaOkqHVCe5Rhz32kwphrcMu','2025-05-27 16:52:39'),('Sunil Kushwaha','9191919191','sunil123@gmail.com','$2b$10$kWTid3lGHS9OEamLQsWN2uStJoW63Jy1zYtyWNlri8fZXzWgZVA3K','2025-05-21 16:21:48'),('Priyanka Rai','9300040287','priyankarai08827@gmail.com','$2b$10$occPn0j1fR55Yp9tEalAKe53lJz40j7GxxPGnTO50Azk89iEJL57.','2025-06-06 11:18:07'),('Shyam Yadav','9301488188','shyam123@gmail.com','$2b$08$TrUuPa7w1rzK3XGn6lOlBuycE7sayhEwZMQG5wsvt5H2FORBArFIa','2025-05-15 10:50:17'),('pds','9302840000','pphotos108@gmail.com','$2b$10$9An9eCz/OLNiCKnBvEpec.xFCvoZQ5gsN52PJgeqg8XDjNoauyCWS','2025-06-06 11:16:28'),('Pradeep Dhakad','9302840200','pradeepdhakad000@gmail.com','$2b$10$SA1T6sTKtLx7SkWbFZhUmutaxzllw8BfCBDx/EyQ6g9tJrFLTazCy','2025-05-27 11:58:43'),('Hemant','9302840280','hemantharikawat@gmail.com','$2b$10$CDgkt9d3PuWaeFAdsktEG.vspFMj0QfLmLttu6k2nDRYxUo1iE9YG','2025-06-05 19:40:13'),('Nancy Katiyar','9302840282','nancy123@gmail.com','$2b$08$DAKNyy4dEmdTtIZpA9bwsOG4E1332fp0HMNwHqNmlexLwzFQV4tVq','2025-05-13 11:30:40'),('Ambuj Pandey','9302840283','ambuj123@gmail.com','$2b$08$TTjHk0jo5EFXf03J8HJoQOSXjJ2NKNnc4eyqffB1dum2AB2eCZT5y','2025-05-13 11:31:10'),('Devendra Malviya','9302840286','devendra123@gmail.com','$2b$08$5EQGSHdFSj5KcLDkKhHvOu8F0eCHsg23shR4SHTbBHer2gIhqxiRu','2025-05-13 11:30:03'),('Pradeep Dhakad','9302840287','pradeepdhakad095@gmail.com','$2b$10$Q291v3GRcqKINT2dutwKHeq5X63Sh2ypm4EMyOvqxSvK.ha7x56Ie','2025-05-12 12:20:35'),('Pratibha Patel','9302848888','pradeepdhakad111@gmail.com','$2b$10$6kifBMtcjMsp3U7HkaSvuu4CeJ5q2AXWRnza9YETtX3Hoklzep9Ge','2025-05-27 11:59:27'),('Ravi Yadav','9685474893','ravi123@gmail.com','$2b$08$WgbRlHvX06lbPwZzJ2DroeZHpusDXubM3BN2TpxTHsyhhYE7bnK1K','2025-05-16 10:27:03'),('asdfcgvb','9834765438','pradeepdhakad09115@gmail.com','$2b$10$H1PZQpe8vdA2RzooM1nMNueg5Xa3zqOz61QQGFZJk0b829lEKJDFK','2025-05-27 12:00:39'),('Anil Dhakad','9898989898','anil123@gmail.com','$2b$10$PGi4sOvj1R5TRnRCbF602eGLBt8I8ekFVc5IM4biGsQHsu3XP8C42','2025-05-18 16:29:08');
/*!40000 ALTER TABLE `seller` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seller_profile`
--

DROP TABLE IF EXISTS `seller_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seller_profile` (
  `mobile` varchar(10) NOT NULL,
  `aadhar` varchar(12) NOT NULL,
  `pan` varchar(10) NOT NULL,
  `status` int DEFAULT '1',
  `photo` varchar(255) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `address` text NOT NULL,
  PRIMARY KEY (`mobile`),
  UNIQUE KEY `aadhar` (`aadhar`),
  UNIQUE KEY `pan` (`pan`),
  CONSTRAINT `fk_seller_mobile` FOREIGN KEY (`mobile`) REFERENCES `seller` (`mobile`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chk_aadhar` CHECK (regexp_like(`aadhar`,_utf8mb4'^[0-9]{12}$')),
  CONSTRAINT `chk_gender` CHECK ((`gender` in (_utf8mb4'Male',_utf8mb4'Female',_utf8mb4'Other'))),
  CONSTRAINT `chk_pan` CHECK (regexp_like(`pan`,_utf8mb4'^[A-Z]{5}[0-9]{4}[A-Z]$')),
  CONSTRAINT `chk_status_profile` CHECK ((`status` in (0,1)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seller_profile`
--

LOCK TABLES `seller_profile` WRITE;
/*!40000 ALTER TABLE `seller_profile` DISABLE KEYS */;
INSERT INTO `seller_profile` VALUES ('8305821891','656980089599','HCOPD2099O',1,NULL,'Female','2001-06-20','Kolar , Bhopal , Madhya Pradesh'),('9098678093','656981989599','HCOKD2099L',1,'mb6fji3a3fq4.jpg','Male','2025-05-29','Ramnagar , Guna , MP'),('9302840286','656901089599','HCOPD2099L',1,'mb62sp68cgvt.jpg','Male','2025-05-26','Khujner , Rajgarh , MP'),('9302840287','656981088599','HCOPD2099H',1,'mbzdcdvm5lji.jpg','Male','2025-05-30','Raghogarh, Guna , Madhya Pradesh');
/*!40000 ALTER TABLE `seller_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sold_property`
--

DROP TABLE IF EXISTS `sold_property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sold_property` (
  `property_number` varchar(20) NOT NULL,
  `buyer_mobile` varchar(10) DEFAULT NULL,
  `seller_mobile` varchar(10) DEFAULT NULL,
  `sale_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`property_number`),
  KEY `buyer_mobile` (`buyer_mobile`),
  KEY `seller_mobile` (`seller_mobile`),
  CONSTRAINT `sold_property_ibfk_1` FOREIGN KEY (`property_number`) REFERENCES `property_details` (`property_number`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sold_property_ibfk_2` FOREIGN KEY (`buyer_mobile`) REFERENCES `buyer` (`mobile`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `sold_property_ibfk_3` FOREIGN KEY (`seller_mobile`) REFERENCES `seller` (`mobile`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sold_property`
--

LOCK TABLES `sold_property` WRITE;
/*!40000 ALTER TABLE `sold_property` DISABLE KEYS */;
INSERT INTO `sold_property` VALUES ('P206','9302840287','7897897890','2025-06-10 10:00:00'),('P226','9098678093','7897897890','2025-06-10 10:00:00'),('P256','9098678093','9302840287','2025-06-10 10:00:00');
/*!40000 ALTER TABLE `sold_property` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `property_number` varchar(20) NOT NULL,
  `buyer_mobile` varchar(10) NOT NULL,
  `payment_id` varchar(100) NOT NULL,
  `order_id` varchar(100) NOT NULL,
  `signature` text,
  `amount` decimal(15,2) NOT NULL,
  `status` enum('success','failed','pending') DEFAULT 'success',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `property_number` (`property_number`),
  KEY `buyer_mobile` (`buyer_mobile`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`property_number`) REFERENCES `property_details` (`property_number`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`buyer_mobile`) REFERENCES `buyer` (`mobile`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` varchar(25) NOT NULL,
  `full_name` varchar(30) NOT NULL,
  `password` varchar(200) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `chk_status` CHECK ((`status` in (0,1)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('u101','Devendra Malviya','$2b$10$gUfskSiFWWDXx/d5UAZNsOfDrSsGLuYLPp7qifRSfWM42DQ5KgsRa',1,'2025-04-25 01:21:04'),('u102','Piyush Saini','$2b$10$Pwt7C4/7BRa0jDY4W/nyuOfslQZratAQJAauhjSIElrTnfnEClxui',1,'2025-04-25 01:22:16'),('u103','Ambuj Pandey','$2b$10$Jt/KUhFJdF7e3wCiMdUL6.DJhu728nKq5fplqxWm40IPJ.3g5bB7O',1,'2025-04-30 13:41:14'),('u105','Pratibha Sharma','$2b$10$Leow9g7rn5Dm6izZvFmxx.VuVmztJnDqqhYVNMrjPDZCTEuvt3S9e',0,'2025-05-06 13:02:19'),('u106','Nancy Katiyar','$2b$10$EN0Af3zVDqLilNxVfOSDKeSqf7Q2ktextNxLBoq9RanlNwuSljzeu',0,'2025-05-12 10:32:20'),('u107','Pradeep Dhakad','$2b$10$xm22w0qyIoNZJFrawsy4Rue1pNz.iAfh0FLvcTBcRU3/2j9GTpDh2',0,'2025-05-12 10:32:51'),('u108','Saksham Richhariya','$2b$10$uwtDjAdv651VWqT.aIxhBeehxftep2fvDiQwE7BvndF27b/N6LB0u',0,'2025-05-12 10:33:27'),('u109','Vidhya Thapa','$2b$10$T8jOusVA2ak4pCIpLXeiDutY6Un2ZxgmONgXxmZS9t9qr8b5UV1Sa',0,'2025-06-18 13:21:34');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `user_id` varchar(25) NOT NULL,
  `rid` varchar(10) NOT NULL,
  PRIMARY KEY (`user_id`,`rid`),
  KEY `rid` (`rid`),
  CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`rid`) REFERENCES `role` (`rid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES ('u101','r101'),('u102','r102'),('u107','r103'),('u101','r106');
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-03 16:12:16
