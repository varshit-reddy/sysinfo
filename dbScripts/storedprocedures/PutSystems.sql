create or replace procedure PutSystems(
   _customer_name VARCHAR (255) ,
	_os_name VARCHAR (255) ,
	_location VARCHAR (100) ,
	_serial_num VARCHAR ( 100) ,
    _alert VARCHAR (255),
    _id int,
    _isUpdate boolean
)
language plpgsql    
as $$
begin
    -- subtracting the amount from the sender's account 
  if not _isUpdate then
INSERT INTO systems (customer_name, os_name,location,serial_num,alert)
VALUES(_customer_name, _os_name,_location,_serial_num,_alert);

else
Update systems
Set alert = CASE WHEN _alert is null THEN alert
            
            ELSE _alert
       END,
serial_num =CASE WHEN _serial_num   is null THEN serial_num
            
            ELSE _serial_num
       END,
customer_name =CASE WHEN customer_name  is null THEN customer_name
            
            ELSE customer_name
       END ,
os_name =CASE WHEN _os_name  is null  THEN os_name
            
            ELSE _os_name
       END ,location= CASE WHEN _location is null  THEN location
            
            ELSE _location
       END 
where id = _id;
commit;
end if;
end;$$