INSERT INTO  employee (id, first_name, last_name, role_id) 
VALUES  (001, "Harry", "Potter", 1001),
        (002,"Hermione", "Granger", 1002),
        (003, "Ron"," Weasley", 1003),
        (004, "Albus","Dumbledore", 1004),
        (005, "Rubeus", "Hagrid",1005),
        (006, "Severus", "Snape",1006),
        (007, "Draco", "Malfoy", 1007),
        (008, "Luna", "Lovegood", 1003),
        (009, "Neville", "Longbottom", 1001),
        (010, "Ginny", "Weasley", 1004);
        
     

    INSERT INTO departments (id, name)
    VALUES  (501, "Sales"),
            (502, "Accounting"),
            (503, "Legal"),
            (504, "Management"),
            (505, "Engineering");

    INSERT INTO role (id, title, salary, department_id)
    VALUES  (1001, "Salesperson", 50000, 501),
            (1002, "Accountant", 60000, 502),
            (1003, "Lawyer", 70000, 503),
            (1004, "CEO", 100000, 504),
            (1005, "Manager", 80000, 504),
            (1006, "Sales Manager", 90000, 504),
            (1007, "Engineer", 70000, 505);
