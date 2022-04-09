**Tutorial de instalacion proyecto INFO 290**

Programas requeridos para el funcionamiento de la pagina web

**1. Instalacion WINDOWS**

Programas|Descarga
---|---
`Node JS`|https://nodejs.org/en/download/ 
`XAMPP`| https://www.apachefriends.org/es/download.html
`Visual Studio Code (Para Terminales)”`|https://code.visualstudio.com/download



**2. Preparacion de la base de datos.**

        1. Abrir XAMPP.
        2.  a) Iniciar modulo APACHE. 
            b) Iniciar modulo MYSQL.
        3. En el modulo MYSQL clickear "ADMIN"
        4. Al ingresar en la pagina PHPMYADMIN apretar "Nueva" ubicado en la izquierda donde se encuentran las bases de datos.
        5. Apretar el boton que dice "Importar" en la barra superior.
        6. Apretar "seleccionar archivo" y agregar el archivo "campanita" ubicado en la carpeta "utiles" del repositorio llamado "campanita".
        7. Apretar boton continuar ubicado en la parte baja de la pagina para subir la base de datos
        8. Hacer Click a la base de datos "campanita" ubicado en la izquierda.
        9. Clickear importar ubicado en la barra superior.
        10.Apretar "seleccionar archivo" y agregar el archivo "db_campanita_2021_12_22-09.20.45_AM" ubicado en la carpeta "utiles" del repositorio llamado "campanita".
        


             


**3. Preparacion y funcionamiento de pagina web.**

        1. Clonar repositorio.
        2.   a) Abrir terminal en carpeta cliente.
             b) Abrir terminal en carpeta server. 
        3. En las 2 terminales (cliente/server) se debe colocar el comando "npm install".
        4. En consola Server colocar comando "npm start"
        5. En consola Cliente colocar comando "npm start"
    
**4. Pruebas en pagina.**

    Para las pruebas automaticas en el cliente haciendo los pasos anteriores .

        0. Instalar Driver de navegador para la carpeta cliente.
        1.   a) Abrir terminal en carpeta cliente.
             b) Abrir terminal en carpeta server. 
        2. En las 2 terminales (cliente/server) se debe colocar el comando "npm install".
        3. Ingresar el comando "npm install selenium-webdriver"
        4. En consola Server colocar comando "npm start"
        5. En consola Cliente colocar comando "npm start"
        6. Abrir nueva terminal en "cliente"
        7. Utilizar comandos:
                A) node .\Test\firstTest.js 
                B) node .\Test\secondTest.js
                
