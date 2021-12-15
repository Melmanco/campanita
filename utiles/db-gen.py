from os import name
import sys
import random
from datetime import datetime

NAMES=['Abigail', 'Abril', 'Bárbara', 'Camila', 'Isidora', 'Karla', 'Luz', 'Mariana', 'Sonia', 'Valentina', 'Alberto', 'David', 'Fabián', 'Juan', 'Lucas', 'Mateo', 'Rafael', 'Ricardo', 'Samuel', 'Víctor']
LASTNAMES=['García', 'Rodríguez', 'Martínez', 'Hernández', 'López', 'González', 'Pérez', 'Sánchez', 'Ramírez', 'Torres', 'Flores', 'Rivera', 'Gómez', 'Díaz', 'Reyes', 'Cruz', 'Morales', 'Ortiz', 'Gutiérrez']

def main(filename, group_min=15, group_max=20, group_qty=5):
    date = datetime.now().strftime('%Y_%m_%d-%I.%M.%S_%p')
    file = open(f'db_campanita_{date}.sql', 'w', encoding='utf-8')
    ruts = []
    random.seed(datetime.now())

    for group in range(group_qty):
        file.write(f'INSERT INTO grupo(ID_Grupo, Nombre) values({group+1}, "grupo {group+1}");\n')
        
        for member in range(random.randrange(group_min, group_max+1)):
            rut = random.randint(23000000,24000000)
            while rut in ruts:
                    rut = random.randint(23000000,24000000)
            ruts.append(rut)

            name = random.choice(NAMES)
            lastname = random.choice(LASTNAMES)
            pwd = str(random.randint(10000000,99999999))
            email = str(rut) + '@outlook.com'

            file.write(f'INSERT INTO usuario(RUT, Nombre, Perfil, Contraseña, Email) values({rut}, "{name} {lastname}", "Estudiante", "{pwd}", "{email}");\n')
            file.write(f'INSERT INTO contiene(ID_Grupo, RUT) values({group+1}, {rut});\n')
        
        rut = random.randint(10000000,15000000)
        while rut in ruts:
                rut = random.randint(10000000,15000000)
        ruts.append(rut)

        name = random.choice(NAMES)
        lastname = random.choice(LASTNAMES)
        pwd = str(random.randint(10000000,99999999))
        email = str(rut) + '@outlook.com'

        file.write(f'INSERT INTO usuario(RUT, Nombre, Perfil, Contraseña, Email) values({rut}, "{name} {lastname}", "Docente", "{pwd}", "{email}");\n')
        file.write(f'INSERT INTO contiene(ID_Grupo, RUT) values({group+1}, {rut});\n')

    

if __name__ == '__main__':
    main(*sys.argv)