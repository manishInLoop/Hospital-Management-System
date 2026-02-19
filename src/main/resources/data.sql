INSERT INTO patient (name, gender, birth_date, email, blood_group) VALUES
('Suman Chaudhary', 'Male', '2002-05-14', 'suman@gmail.com', 'O_POSITIVE'),
('Amit Kumar', 'Male', '2001-03-22', 'amit@gmail.com', 'B_POSITIVE'),
('Sita Sharma', 'Female', '2002-10-05', 'sita@gmail.com', 'A_POSITIVE'),
('Rahul Singh', 'Male', '2000-12-18', 'rahul@gmail.com', 'AB_POSITIVE'),
('Nisha Karki', 'Female', '2003-07-09', 'nisha@gmail.com', 'O_NEGATIVE'),
('Rohit Thapa', 'Male', '2001-09-30', 'rohit@gmail.com', 'A_NEGATIVE');

INSERT INTO doctor (name, specialization, email) VALUES
('Dr. Anil Joshi', 'Cardiology', 'anil@gmail.com'),
('Dr. Meera Pandey', 'Neurology', 'meera@gmail.com'),
('Dr. Rajesh Shrestha', 'Orthopedics', 'rajesh@gmail.com');

INSERT INTO appointment (patient_id, doctor_id, appointment_date, reason) VALUES
(1, 1, '2024-07-01 10:00:00', 'Regular Checkup'),
(2, 2, '2024-07-02 11:30:00', 'Headache Consultation'),
(3, 3, '2024-07-03 09:00:00', 'Knee Pain Evaluation'),
(4, 1, '2024-07-04 14:00:00', 'Heart Palpitations'),
(5, 2, '2024-07-05 15:30:00', 'Migraine Follow-up'),
(6, 3, '2024-07-06 13:00:00', 'Back Pain Assessment');