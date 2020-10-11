ALTER TABLE public.user_jurisdiction
	ALTER COLUMN user_id SET NOT NULL ,
	ALTER COLUMN jurisdiction_id SET NOT NULL ,
	ADD CONSTRAINT user_jurisdiction_uq1 UNIQUE (user_id , jurisdiction_id);

ALTER TABLE public.user_state
	ALTER COLUMN user_id SET NOT NULL ,
	ALTER COLUMN state_id SET NOT NULL ,
	ADD CONSTRAINT user_state_uq1 UNIQUE (user_id , state_id);

