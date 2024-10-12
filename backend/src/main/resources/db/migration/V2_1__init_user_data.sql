INSERT INTO _user ( name, surname, phone, email,active, password, role)
VALUES
('Adam', 'Nowak', '+48 923 123 123','waiterAdam@gmail.com',true,'$2a$10$SNwa/sfgVcqc8NtFJDtLc.HhVgDxMEdP8iBKb4PsiHAEdxj80CRqS', 'WAITER'),
('Kacper', 'Kowalczyk','+48 253 653 613','adminKacper@gmail.com',true, '$2a$10$SNwa/sfgVcqc8NtFJDtLc.HhVgDxMEdP8iBKb4PsiHAEdxj80CRqS', 'ADMIN'),
('Maria', 'Biskup','+48 556 253 733','waiterMaria@gmail.com',true, '$2a$10$SNwa/sfgVcqc8NtFJDtLc.HhVgDxMEdP8iBKb4PsiHAEdxj80CRqS', 'WAITER'),
('Kasia', 'Lewandowska','+48 556 253 733','waiterKasia@gmail.com',true, '$2a$10$SNwa/sfgVcqc8NtFJDtLc.HhVgDxMEdP8iBKb4PsiHAEdxj80CRqS', 'WAITER'),
('Michal', 'Duda','+48 556 253 733','waiterMichal@gmail.com',true, '$2a$10$SNwa/sfgVcqc8NtFJDtLc.HhVgDxMEdP8iBKb4PsiHAEdxj80CRqS', 'WAITER'),
('Piotr', 'Wisniewski','+48 556 253 733','waiterPiotr@gmail.com',true, '$2a$10$SNwa/sfgVcqc8NtFJDtLc.HhVgDxMEdP8iBKb4PsiHAEdxj80CRqS', 'WAITER'),
('Gosia', 'Michalczyk','+48 556 253 733','waiterGosia@gmail.com',true, '$2a$10$SNwa/sfgVcqc8NtFJDtLc.HhVgDxMEdP8iBKb4PsiHAEdxj80CRqS', 'WAITER'),
('Pawel', 'Bigos','+48 556 253 733','waiterPawel@gmail.com',true, '$2a$10$SNwa/sfgVcqc8NtFJDtLc.HhVgDxMEdP8iBKb4PsiHAEdxj80CRqS', 'WAITER'),
('Wiktoria', 'Zielinska','+48 556 253 733','waiterWikoria@gmail.com',true, '$2a$10$SNwa/sfgVcqc8NtFJDtLc.HhVgDxMEdP8iBKb4PsiHAEdxj80CRqS', 'WAITER'),
('Kuba', 'Pawlak','+48 556 253 733','waiterKuba@gmail.com',true, '$2a$10$SNwa/sfgVcqc8NtFJDtLc.HhVgDxMEdP8iBKb4PsiHAEdxj80CRqS', 'WAITER'),
('Franciszek', 'Cypel','+48 556 253 733','waiterFranciszek@gmail.com',true, '$2a$10$SNwa/sfgVcqc8NtFJDtLc.HhVgDxMEdP8iBKb4PsiHAEdxj80CRqS', 'WAITER'),
('Marian', 'Czekaj','+48 556 253 733','waiterMarian@gmail.com',true, '$2a$10$SNwa/sfgVcqc8NtFJDtLc.HhVgDxMEdP8iBKb4PsiHAEdxj80CRqS', 'WAITER');

INSERT INTO restaurant_owner(email)
VALUES
('userAdam@gmail.com');

