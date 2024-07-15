INSERT INTO _user ( name, surname, phone, email, password, role)
VALUES
('Adam', 'Nowak', '+48 923 123 123','userAdam@gmail.com','$2a$10$SNwa/sfgVcqc8NtFJDtLc.HhVgDxMEdP8iBKb4PsiHAEdxj80CRqS', 'USER'),
('Kacper', 'Kowalczyk','+48 253 653 613','adminKacper@gmail.com', '$2a$10$SNwa/sfgVcqc8NtFJDtLc.HhVgDxMEdP8iBKb4PsiHAEdxj80CRqS', 'ADMIN');

INSERT INTO restaurant_owner(email)
VALUES
('userAdam@gmail.com');

