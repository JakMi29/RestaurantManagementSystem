INSERT INTO _user ( name, surname, phone, email, password, role)
VALUES
('Adam', 'Nowak', '+48 923 123 123','waiterAdam@gmail.com','$2a$10$SNwa/sfgVcqc8NtFJDtLc.HhVgDxMEdP8iBKb4PsiHAEdxj80CRqS', 'WAITER'),
('Kacper', 'Kowalczyk','+48 253 653 613','adminKacper@gmail.com', '$2a$10$SNwa/sfgVcqc8NtFJDtLc.HhVgDxMEdP8iBKb4PsiHAEdxj80CRqS', 'ADMIN'),
('Maria', 'Biskup','+48 556 253 733','waiterMaria@gmail.com', '$2a$10$SNwa/sfgVcqc8NtFJDtLc.HhVgDxMEdP8iBKb4PsiHAEdxj80CRqS', 'WAITER');

INSERT INTO restaurant_owner(email)
VALUES
('userAdam@gmail.com');

