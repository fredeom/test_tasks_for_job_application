CREATE TABLE IF NOT EXISTS `numbers` (`id` INT UNIQUE, `num` INT UNIQUE, `parentId` INT);

INSERT INTO `numbers` (`id`, `num`) VALUES (1, 2);
INSERT INTO `numbers` (`id`, `num`) VALUES (3, 4);
INSERT INTO `numbers` (`id`, `num`) VALUES (5, 6);
INSERT INTO `numbers` (`id`, `num`) VALUES (10, 20);
INSERT INTO `numbers` (`id`, `num`) VALUES (30, 40);
INSERT INTO `numbers` (`id`, `num`) VALUES (20, 30);
INSERT INTO `numbers` (`id`, `num`) VALUES (50, 60);
INSERT INTO `numbers` (`id`, `num`) VALUES (100, 200);
INSERT INTO `numbers` (`id`, `num`) VALUES (300, 400);
INSERT INTO `numbers` (`id`, `num`) VALUES (500, 600);

UPDATE numbers n0 INNER JOIN numbers n1 ON n1.num > n0.num LEFT JOIN numbers n2 ON n2.num < n1.num AND n0.num < n2.num SET n0.parentId = n1.id WHERE n2.id IS NULL;