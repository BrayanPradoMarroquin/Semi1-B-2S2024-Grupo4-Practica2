# Semi1-B-2S2024-Grupo4-Practica2

### Grupo 4

### Integrantes

| Usuario | Carnet |
|----------|----------|
| Pablo José Oliva Bonilla | 201700898 |
| Eduardo René Agustin Mendoza | 201801627 |
| Brayan Hamllelo Stevem Prado Marroquin | 201801369 |
| Henrry Gabriel Peralta Martinez | 201700898 |

### Descripción de la arquitectura

La arquitectura utiliza los siguientes servicios de AWS:
* **2 EC2:** Que funcionan como servidores de backend en el que se exponen los puertos 4000 de cada uno. El backend se consume por medio de endpoints.
* **Balanceador de carga:** Para distribuir las peticiones entre las dos EC2
* **Bucket S3 Frontend:** En el se aloja el frontend sirviendo archivos estáticos que consumen los endpoints del balanceador de carga
* **Bucket S3 Imagenes:** En el se alojan las imágenes que suben y consumen desde el frontend.
* **Base de datos RDS:** Se creó una base de datos en MYSQL en RDS para almacenar los registros de Faunadex.

### Descripción de los diferentes usuarios IAM

Se crearon 3 usuarios IAM para acceder a los recursos desde código.

#### IAM para RDS
Usuario llamado **RDSUser** con los permisos **AmazonRDSFullAccess**

#### IAM para EC2

Usuario llamado **UserEC2** con los permisos **AmazonEC2FullAccess**

### IAM para S3

Usuario llamado **S3_201801369** con los permisos **AmazonS3FullAccess** e **IAMFullAccess**
