DROP FUNCTION ingress_hoursstatementtotable (param_officehoursstring text);

CREATE OR REPLACE FUNCTION ingress_hoursstatementtotable (param_officehoursstring text)
	RETURNS TABLE (
		begin_hour time without time zone
		, end_hour time without time zone
		, use_monday boolean
		, use_tuesday boolean
		, use_wednesday boolean
		, use_thursday boolean
		, use_friday boolean
		, use_saturday boolean
		, use_sunday boolean
	)
	AS $$
	SELECT
		t2.begin_hour::time WITHOUT time zone
		, t2.end_hour::time WITHOUT time zone
		, (t2.effective_mask & B'0000001') <> 0::bit(7) use_monday
		, (t2.effective_mask & B'0000010') <> 0::bit(7) use_tuesday
		, (t2.effective_mask & B'0000100') <> 0::bit(7) use_wednesday
		, (t2.effective_mask & B'0001000') <> 0::bit(7) use_thursday
		, (t2.effective_mask & B'0010000') <> 0::bit(7) use_friday
		, (t2.effective_mask & B'0100000') <> 0::bit(7) use_saturday
		, (t2.effective_mask & B'1000000') <> 0::bit(7) use_sunday
	FROM (
		SELECT
			t1.begin_day
			, t1.end_day
			, t1.begin_hour
			, t1.end_hour
			, CASE WHEN (di_b.day_bit <= di_e.day_bit) THEN
				bit_or(di_m1.day_bit)
			ELSE
				~ ((di_b.day_bit | di_e.day_bit) # bit_or(di_m1.day_bit))
			END effective_mask
		FROM (
			SELECT
				hourset
				, CASE WHEN (substring(hourset , 0 , POSITION(':' IN hourset))
					LIKE '%-%') THEN
					substring(substring(hourset , 0 , POSITION(':' IN hourset)) , 0 , POSITION('-' IN substring(hourset , 0 , POSITION(':' IN hourset)))) -- return the first day
				ELSE
					substring(hourset , 0 , POSITION(':' IN hourset)) -- return the one and only day
				END AS begin_day
				, CASE WHEN (substring(hourset , 0 , POSITION(':' IN hourset))
					LIKE '%-%') THEN
					substring(substring(hourset , 0 , POSITION(':' IN hourset)) , POSITION('-' IN substring(hourset , 0 , POSITION(':' IN hourset))) + 1) -- return the last day
				ELSE
					substring(hourset , 0 , POSITION(':' IN hourset)) -- return the one and only day
				END AS end_day
				, substring(substring(hourset , POSITION(':' IN hourset) + 1) , 0 , POSITION('-' IN substring(hourset , POSITION(':' IN hourset) + 1))) begin_hour
				, substring(substring(hourset , POSITION(':' IN hourset) + 1) , POSITION('-' IN substring(hourset , POSITION(':' IN hourset) + 1)) + 1) end_hour
			FROM (
				SELECT
					UNNEST(STRING_TO_ARRAY(REPLACE(param_officehoursstring , ' ' , '') , ';')) hourset) t0) t1
			INNER JOIN ref_dayofweekindex di_b ON t1.begin_day = di_b.day_name
			INNER JOIN ref_dayofweekindex di_e ON t1.end_day = di_e.day_name
			LEFT OUTER JOIN ref_dayofweekindex di_m1 ON CASE WHEN (di_b.day_bit < di_e.day_bit) THEN
				di_m1.day_bit >= di_b.day_bit
					AND di_m1.day_bit <= di_e.day_bit
				ELSE
					di_m1.day_bit >= di_e.day_bit
					AND di_m1.day_bit <= di_b.day_bit
			END
	GROUP BY
		t1.begin_day
		, t1.end_day
		, t1.begin_hour
		, t1.end_hour
		, di_b.day_bit
		, di_e.day_bit) t2
$$
LANGUAGE SQL;

