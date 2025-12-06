-- Insert demo companies
INSERT INTO companies (id, name, domain, industry, size, annual_revenue) VALUES
('11111111-1111-1111-1111-111111111111', 'TechCorp Solutions', 'techcorp.com', 'Software', '100-500', 5000000),
('22222222-2222-2222-2222-222222222222', 'Global Industries', 'globalind.com', 'Manufacturing', '500-1000', 50000000),
('33333333-3333-3333-3333-333333333333', 'Startup Innovate', 'startupinnovate.com', 'Technology', '10-50', 500000),
('44444444-4444-4444-4444-444444444444', 'Enterprise Corp', 'enterprisecorp.com', 'Finance', '1000+', 100000000),
('55555555-5555-5555-5555-555555555555', 'MediaFlow Agency', 'mediaflow.com', 'Marketing', '50-100', 2000000);

-- Insert demo contacts
INSERT INTO contacts (company_id, first_name, last_name, email, phone, position) VALUES
('11111111-1111-1111-1111-111111111111', 'John', 'Smith', 'john.smith@techcorp.com', '+1-555-0101', 'CTO'),
('11111111-1111-1111-1111-111111111111', 'Sarah', 'Johnson', 'sarah.j@techcorp.com', '+1-555-0102', 'VP Sales'),
('22222222-2222-2222-2222-222222222222', 'Michael', 'Brown', 'mbrown@globalind.com', '+1-555-0201', 'CEO'),
('33333333-3333-3333-3333-333333333333', 'Emma', 'Davis', 'emma@startupinnovate.com', '+1-555-0301', 'Founder'),
('44444444-4444-4444-4444-444444444444', 'Robert', 'Wilson', 'r.wilson@enterprisecorp.com', '+1-555-0401', 'Director IT'),
('55555555-5555-5555-5555-555555555555', 'Lisa', 'Martinez', 'lisa.m@mediaflow.com', '+1-555-0501', 'Marketing Director');

-- Insert demo deals
INSERT INTO deals (company_id, contact_id, title, value, stage, probability, expected_close_date, ai_score) VALUES
('11111111-1111-1111-1111-111111111111', (SELECT id FROM contacts WHERE email = 'john.smith@techcorp.com'), 'Enterprise Software License', 125000, 'negotiation', 75, CURRENT_DATE + INTERVAL '15 days', 85),
('22222222-2222-2222-2222-222222222222', (SELECT id FROM contacts WHERE email = 'mbrown@globalind.com'), 'Digital Transformation Project', 500000, 'proposal', 50, CURRENT_DATE + INTERVAL '30 days', 72),
('33333333-3333-3333-3333-333333333333', (SELECT id FROM contacts WHERE email = 'emma@startupinnovate.com'), 'Growth Package', 25000, 'qualification', 40, CURRENT_DATE + INTERVAL '45 days', 68),
('44444444-4444-4444-4444-444444444444', (SELECT id FROM contacts WHERE email = 'r.wilson@enterprisecorp.com'), 'Infrastructure Upgrade', 750000, 'prospecting', 25, CURRENT_DATE + INTERVAL '60 days', 55),
('55555555-5555-5555-5555-555555555555', (SELECT id FROM contacts WHERE email = 'lisa.m@mediaflow.com'), 'Marketing Automation Suite', 45000, 'closed_won', 100, CURRENT_DATE - INTERVAL '5 days', 92);

-- Insert demo activities
INSERT INTO activities (deal_id, contact_id, type, subject, description, due_date, completed) VALUES
((SELECT id FROM deals WHERE title = 'Enterprise Software License'), (SELECT id FROM contacts WHERE email = 'john.smith@techcorp.com'), 'meeting', 'Final negotiation call', 'Discuss contract terms and pricing', CURRENT_TIMESTAMP + INTERVAL '2 days', FALSE),
((SELECT id FROM deals WHERE title = 'Digital Transformation Project'), (SELECT id FROM contacts WHERE email = 'mbrown@globalind.com'), 'email', 'Send proposal document', 'Forward detailed proposal with ROI analysis', CURRENT_TIMESTAMP + INTERVAL '1 day', FALSE),
((SELECT id FROM deals WHERE title = 'Growth Package'), (SELECT id FROM contacts WHERE email = 'emma@startupinnovate.com'), 'call', 'Discovery call', 'Understand business needs and pain points', CURRENT_TIMESTAMP + INTERVAL '3 days', FALSE);

-- Insert email templates
INSERT INTO email_templates (name, subject, body, trigger_stage, active) VALUES
('Welcome Email', 'Welcome to Our Platform!', 'Hi {{first_name}},\n\nThank you for your interest! We are excited to help you achieve your goals.\n\nBest regards,\nThe Team', 'prospecting', TRUE),
('Proposal Follow-up', 'Following up on our proposal', 'Hi {{first_name}},\n\nI wanted to follow up on the proposal we sent last week. Do you have any questions?\n\nBest regards,\nSales Team', 'proposal', TRUE),
('Closing Email', 'Lets close this deal!', 'Hi {{first_name}},\n\nWe are so close! Lets schedule a final call to get everything signed.\n\nBest regards,\nSales Team', 'negotiation', TRUE);
