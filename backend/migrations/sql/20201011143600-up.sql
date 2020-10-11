ALTER TABLE public.user_jurisdiction
	ALTER COLUMN user_id SET NOT NULL ,
	ALTER COLUMN jurisdiction_id SET NOT NULL ,
	ADD CONSTRAINT user_jurisdiction_uq1 UNIQUE (user_id , jurisdiction_id);

ALTER TABLE public.user_state
	ALTER COLUMN user_id SET NOT NULL ,
	ALTER COLUMN state_id SET NOT NULL ,
	ADD CONSTRAINT user_state_uq1 UNIQUE (user_id , state_id);

ALTER TABLE public.wip_jurisdiction
	DROP COLUMN editor_comments;

ALTER TABLE public.wip_state
	DROP COLUMN editor_comments;

CREATE OR REPLACE FUNCTION wip_jurisdiction_selectorcreate (_param_jurisdiction_id IN int , _param_user_id IN int , _out_wip_jurisdiction_id OUT int)
LANGUAGE plpgsql
AS $$
DECLARE
	curr_wip_jurisdiction_id int;
	r record;
BEGIN
	IF NOT EXISTS (
		SELECT
			id
		FROM
			public.user
		WHERE
			id = _param_user_id) THEN
	RAISE EXCEPTION 'user.id= % not found' , _param_user_id
		USING HINT = 'Function can only be called with a valid user.id.';
END IF;
	IF NOT EXISTS (
		SELECT
			id
		FROM
			public.jurisdiction
		WHERE
			id = _param_jurisdiction_id) THEN
	RAISE EXCEPTION 'jurisdiction.id= % not found' , _param_jurisdiction_id
	USING HINT = 'Function can only be called with a valid jurisdiction.id.';
END IF;
	SELECT
		max(wj.id) AS wip_jurisdiction_id INTO r
	FROM
		jurisdiction j
		INNER JOIN wip_jurisdiction wj ON j.id = wj.jurisdiction_id
			AND ((wj.edit_basis_wip_jurisdiction_id IS NULL
					AND j.wip_jurisdiction_id IS NULL)
				OR (wj.edit_basis_wip_jurisdiction_id IS NOT NULL
					AND j.wip_jurisdiction_id IS NOT NULL
					AND j.wip_jurisdiction_id = wj.edit_basis_wip_jurisdiction_id))
	WHERE
		wj.editor_user_id = _param_user_id
		AND j.id = _param_jurisdiction_id
	GROUP BY
		j.id
		, wj.editor_user_id;
	IF (r.wip_jurisdiction_id IS NOT NULL) THEN
		_out_wip_jurisdiction_id = r.wip_jurisdiction_id;
	ELSE
		_out_wip_jurisdiction_id = wip_jurisdiction_create (_param_jurisdiction_id , _param_user_id);
	END IF;
END;
$$;

