/* Create a table called supplier_1 */
CREATE TABLE supplier_1(cost integer, part text);
INSERT INTO supplier_1 VALUES(71,'break');
INSERT INTO supplier_1 VALUES(62,'horn');
INSERT INTO supplier_1 VALUES(34,'pedel');
INSERT INTO supplier_1 VALUES(34,'light');
INSERT INTO supplier_1 VALUES(50,'seat');

/* Create a table called supplier_2 */
CREATE TABLE supplier_2(cost integer, part text);
INSERT INTO supplier_2 VALUES(21,'spring');
INSERT INTO supplier_2 VALUES(82,'tyre');
INSERT INTO supplier_2 VALUES(53,'bell');
INSERT INTO supplier_2 VALUES(34,'tube');
INSERT INTO supplier_2 VALUES(53,'seat');

/* Create a table called supplier_3 */
CREATE TABLE supplier_3(cost integer, part text);
INSERT INTO supplier_3 VALUES(31,'spoke');
INSERT INTO supplier_3 VALUES(72,'tyre');
INSERT INTO supplier_3 VALUES(93,'bolt');
INSERT INTO supplier_3 VALUES(14,'screw');
INSERT INTO supplier_3 VALUES(35,'seat');


/* Select unique parts with priority */
SELECT part, cost 
FROM (SELECT part, cost, rank() over ( partition by part order by priority asc ) as rank 
    FROM (
        SELECT part, cost, 1 as priority FROM supplier_3
        UNION SELECT part, cost, 2 as priority FROM supplier_2
        UNION SELECT part, cost, 3 as priority FROM supplier_1
        )
    )
where rank = 1


-- try executing the above command in below link
https://www.jdoodle.com/execute-sql-online/