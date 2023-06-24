library(ggplot2)
library(dplyr)
datos = read.csv("Ruta")
#Provincias  Incendios desconocidos
ggplot(data = datos,
       mapping = aes(x = incendio_desconocida_numero,
                     y = incendio_provincia)) +
       geom_point() + labs(title = 'Pronvicias-Incendio')