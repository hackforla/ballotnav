DROP VIEW public.user_jurisdiction_with_currwip;

CREATE OR REPLACE VIEW public.user_jurisdiction_with_currwip AS
SELECT
	user_id
	, jurisdiction_id
	, state_name
	, jurisdiction_name
	, wip_jurisdiction_id
	, wip_jurisdiction_is_released
	, CASE WHEN wip_jurisdiction_id IS NULL THEN
		'Published'
	ELSE
		CASE WHEN wip_jurisdiction_id IS NOT NULL
			AND wip_jurisdiction_is_released IS FALSE THEN
			'Edit in Progress'
		ELSE
			CASE WHEN wip_jurisdiction_id IS NOT NULL
				AND wip_jurisdiction_is_released IS TRUE THEN
				'Released for Review'
			ELSE
				'Unknown'
			END
		END
	END AS jurisdiction_status
FROM (
	SELECT
		uj.user_id
		, uj.jurisdiction_id
		, s.name AS state_name
		, j.name AS jurisdiction_name
		, wj.id AS wip_jurisdiction_id
		, wj.is_released AS wip_jurisdiction_is_released
		, RANK() OVER (PARTITION BY uj.jurisdiction_id ORDER BY wj.id DESC) rank
	FROM user_jurisdiction uj
	JOIN "user" u ON uj.user_id = u.id
	JOIN jurisdiction j ON uj.jurisdiction_id = j.id
	JOIN state s ON j.state_id = s.id
	LEFT JOIN wip_jurisdiction wj ON j.id = wj.jurisdiction_id
		AND u.id = wj.editor_user_id
		AND (wj.edit_basis_wip_jurisdiction_id IS NULL
		AND j.wip_jurisdiction_id IS NULL
		OR wj.edit_basis_wip_jurisdiction_id IS NOT NULL
		AND j.wip_jurisdiction_id IS NOT NULL
		AND j.wip_jurisdiction_id = wj.edit_basis_wip_jurisdiction_id)
WHERE uj.status = 'editor'::enum_user_jurisdiction_status) t0
WHERE
	t0.rank = 1;

