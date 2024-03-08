use Kraine;

create table Cars(
	ID int auto_increment not null primary key,
    Brand varchar(255) not null,
    Model varchar(255) not null,
    Seats int(2) not null,
    Transmission enum('Manual','Automatic') not null,
    OneHourPrice double(6, 2) not null,
    TwoHoursPrice double(6, 2) not null,
    FiveHoursPrice double(6, 2) not null,
    OneDayPrice double(6, 2) not null,
    Image varchar(255) not null
);

select * from kraine.Cars;
select * from kraine.Reservation;
select * from kraine.Admin;

UPDATE kraine.Reservation SET ID_Car = 10, PickUpDate = '2024-03-07T04:00:00.000Z', DropOffDate = '2024-03-08T09:00:00.000Z', Price = 144  WHERE ID_R = '13';

create table Reservation(
	ID_R int auto_increment not null primary key,
    ID_Car int not null,
    PickUpDate datetime not null,
    DropOffDate datetime not null,
    check (PickUpdate<DropOffDate),
    Price double(6, 2) not null,
    UNIQUE (PickUpDate, DropOffDate, ID_Car),
    FOREIGN KEY (ID_Car) REFERENCES Cars(ID)
);

create table Admin(
    Name varchar(255) not null primary key,
    Password varchar(255) not null,
    UNIQUE (Password)
);

SELECT * 
        FROM kraine.Cars
        WHERE ID NOT IN (
            SELECT ID_Car
            FROM kraine.Reservation
            WHERE (PickUpDate <= '2024-02-23 15:00:00' AND DropOffDate >= '2024-02-22 15:00:00')
            OR (PickUpDate <= '2024-02-23 15:00:00' AND DropOffDate >= '2024-02-22 15:00:00')
            OR (PickUpDate >= '2024-02-23 15:00:00' AND DropOffDate <= '2024-02-22 15:00:00')
        );

SELECT * FROM kraine.Cars
WHERE ID NOT IN (
	SELECT ID_Car
	FROM kraine.Reservation
	WHERE (PickUpDate <= '2024-02-29 15:00:00' AND DropOffDate >= '2024-02-29 13:00:00')
	OR (PickUpDate <= '2024-02-29 15:00:00' AND DropOffDate >= '2024-02-29 13:00:00')
	OR (PickUpDate >= '2024-02-29 15:00:00' AND DropOffDate <= '2024-02-29 13:00:00')
) and ;

SELECT * FROM kraine.Cars LEFT JOIN kraine.Reservation ON kraine.Cars.ID = kraine.Reservation.ID_Car WHERE kraine.Reservation.ID_Car IS NULL OR kraine.Reservation.DropOffDate < NOW(); 

INSERT INTO kraine.Reservation (ID_Car, PickUpDate, DropOffDate, Price) VALUES ('1', '2024-02-27T08:30:24.600Z', '2024-02-27T22:00:00.000Z', '50.00');


INSERT INTO kraine.Cars (
ID, Brand, Model, Seats, Transmission, OneHourPrice, TwoHoursPrice, FiveHoursPrice, OneDayPrice, Image
) 
VALUES 
( 1 ,'VW', 'Golf 8', 5, 'Manual', 15, 30, 45, 60, 'https://d2f9dw3b0opbul.cloudfront.net/c750760219e04702b9cacf3dca06a358.jpg');


INSERT INTO kraine.Cars (
ID, Brand, Model, Seats, Transmission, OneHourPrice, TwoHoursPrice, FiveHoursPrice, OneDayPrice, Image
) 
VALUES 
( 7 ,'Toyota', 'Yaris', 5, 'Manual', 12, 24, 37, 62, 'https://cdn2.rcstatic.com/images/car_images/web/toyota/yaris_lrg.jpg'),
( 8 , 'Smart', 'Forfour', 4, 'Automatic', 7, 14, 25, 40, 'https://cdn2.rcstatic.com/images/car_images/web/smart/forfour_lrg.jpg'),
( 9 , 'Kia', 'Ceed', 5, 'Manual', 18, 36, 50, 75, 'https://cdn2.rcstatic.com/images/car_images/web/kia/ceed_lrg.jpg'),
( 10 , 'Ford', 'Tourneo Custom', 8, 'Manual', 22, 44, 60, 80, 'https://cdn2.rcstatic.com/images/car_images/new_images/ford/custom_lrg.jpg'),
( 11 , 'Renault', 'Trafic', 9, 'Manual', 25, 50, 75, 100, 'https://cdn2.rcstatic.com/images/car_images/web/renault/trafic_lrg.jpg'),
( 12 , 'VW', 'Arteon', 5, 'Automatic', 15, 30, 45, 60, 'https://cdn2.rcstatic.com/images/car_images/new_images/volkswagen/arteon_lrg.jpg'),
( 13 , 'Audi', 'A4', 5, 'Automatic', 16, 32, 46, 75, 'https://cdn2.rcstatic.com/images/car_images/web/audi/a4_lrg.jpg'),
( 14 , 'Opel', 'Vauxhall Zafira Tourer', 5, 'Manual', 10, 20, 40, 65, 'https://cdn2.rcstatic.com/images/car_images/web/opel/zafira_lrg.jpg'),
( 15 , 'Ford', 'Escape', 5, 'Automatic', 16, 32, 50, 65, 'https://cdn2.rcstatic.com/images/car_images/web/ford/escape_lrg.jpg'),
( 16 , 'Ford', 'Edge', 5, 'Manual', 14, 28, 35, 54, 'https://cdn2.rcstatic.com/images/car_images/web/ford/edge_lrg.jpg'),
( 17 , 'Nissan', 'Frontier', 5, 'Automatic', 17, 34, 47, 70, 'https://cdn2.rcstatic.com/images/car_images/web/nissan/frontier_lrg.jpg'),
( 18 , 'Lincoln', 'MKZ', 5, 'Automatic', 11, 22, 33, 60, 'https://cdn2.rcstatic.com/images/car_images/web/lincoln/mkz_lrg.jpg'),
( 19 , 'Nissan', 'Altima', 5, 'Manual', 16, 32, 48, 74, 'https://cdn2.rcstatic.com/images/car_images/web/nissan/altima_lrg.jpg'),
( 20 , 'Ford', 'Fusion', 4, 'Automatic', 13, 26, 49, 68, 'https://cdn2.rcstatic.com/images/car_images/web/ford/fusion_lrg.jpg');

DELETE FROM kraine.reservation WHERE ID_Car = 1;

SELECT * 
FROM kraine.Cars
WHERE ID NOT IN (
	SELECT ID_Car
	FROM kraine.Reservation
	WHERE (PickUpDate <= '2024-03-07 8:00:00' AND DropOffDate >= '2024-03-07 11:00:00')
	OR (PickUpDate <= '2024-03-07 8:00:00' AND DropOffDate >= '2024-03-07 11:00:00')
	OR (PickUpDate >= '2024-03-07 8:00:00' AND DropOffDate <= '2024-03-07 11:00:00')
)
AND NOT EXISTS (
    SELECT 1
    FROM kraine.Reservation
    WHERE kraine.Reservation.ID_Car = kraine.Cars.ID
    AND DropOffDate >= NOW() - INTERVAL 10 MINUTE
);

SELECT * 
FROM kraine.Cars
WHERE ID NOT IN (
    SELECT ID_Car
    FROM kraine.Reservation
    WHERE 
        (PickUpDate <= '2024-03-08 16:00:00' AND DropOffDate >= '2024-03-07 15:00:00')
        OR (PickUpDate <= '2024-03-08 16:00:00' AND DropOffDate >= '2024-03-07 15:00:00')
        OR (PickUpDate >= '2024-03-08 16:00:00' AND DropOffDate <= '2024-03-07 15:00:00')
)
AND NOT EXISTS (
    SELECT 1
    FROM kraine.Reservation
    WHERE kraine.Reservation.ID_Car = kraine.Cars.ID
    AND DropOffDate >= NOW() - INTERVAL 10 MINUTE
)
AND Brand IN ('Smarts');


SELECT * 
FROM kraine.Cars
WHERE ID NOT IN (
    SELECT ID_Car
    FROM kraine.Reservation
    WHERE 
        (PickUpDate <= '2024-03-07 15:10:00' AND DropOffDate >= '2024-03-07 13:10:00')
        OR (PickUpDate <= '2024-03-07 15:10:00' AND DropOffDate >= '2024-03-07 13:10:00')
        OR (PickUpDate >= '2024-03-07 15:10:00' AND DropOffDate <= '2024-03-07 13:10:00')
)
AND NOT EXISTS (
    SELECT 1
    FROM kraine.Reservation
    WHERE kraine.Reservation.ID_Car = kraine.Cars.ID
    AND DropOffDate <= TIMESTAMPADD(MINUTE, -10, NOW())
)
AND Brand IN ('Smarts');
