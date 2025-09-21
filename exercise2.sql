-- Quantidade de Horas Comprometidas por Professor

SELECT
    p.name AS professor_name,
    SUM( (strftime('%s', cs.end_time) - strftime('%s', cs.start_time)) / 3600.0 ) AS total_weekly_hours
FROM
    PROFESSOR p
JOIN
    CLASS c ON p.id = c.professor_id
JOIN
    CLASS_SCHEDULE cs ON c.id = cs.class_id
GROUP BY
    p.id, p.name
ORDER BY
    total_weekly_hours DESC;

-- Lista de Salas com Horários Ocupados

SELECT
    b.name AS building,
    r.name AS room,
    cs.day_of_week,
    cs.start_time,
    cs.end_time,
    s.name AS subject_taught,
    p.name AS professor
FROM
    ROOM r
JOIN
    BUILDING b ON r.building_id = b.id
LEFT JOIN
    CLASS_SCHEDULE cs ON r.id = cs.room_id
LEFT JOIN
    CLASS c ON cs.class_id = c.id
LEFT JOIN
    SUBJECT s ON c.subject_id = s.id
LEFT JOIN
    PROFESSOR p ON c.professor_id = p.id
ORDER BY
    building, room,
    CASE cs.day_of_week
        WHEN 'Segunda-feira' THEN 1
        WHEN 'Terça-feira' THEN 2
        WHEN 'Quarta-feira' THEN 3
        WHEN 'Quinta-feira' THEN 4
        WHEN 'Sexta-feira' THEN 5
        ELSE 6
    END,
    cs.start_time;