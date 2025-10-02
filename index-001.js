const aS = [{
    name: "La cámara no funciona",
    step: "Medir señales de referencia",
    options: [{
        name: "Correcta medición de señales de referencia",
        step: "Medir alimentación: 1.8v, 1.2v, 2.8v",
        color: "green",
        options: [{
            name: "Correcta medición de alimentación",
            step: "Medir control",
            color: "green",
            options: [{
                solution: "Estas líneas de comunicación: SDA, SCL, RST, CLK, etc, se miden con osciloscopio, pero si aún no tenemos osciloscopio podemos medirle  su voltaje con él multímetro."
            }]
        }, {
            name: "Incorrecta Medición de alimentación",
            step: "Verificar fuente de alimentación: 'PMIC - LDO'",
            color: "red",
            options: [{
                solution: 'Recuerda medir el control "enable" del LDO. puede tener un LDO, un PMIC dedicado a camaras o tranquilamente puede ser el PMIC principal el encargado de alimentar las cámaras.'
            }]
        }]
    }, {
        name: "Incorrecta medición de señales de referencia",
        color: "red",
        options: [{
            solution: "Si el valor está OL es decir, abierto o muy alto, generalmente el problema será resistor, filtro EMI, bobina o IC; Y si, por el contrario, el valor está en 0 es decir, en corto o muy bajo, el responsable generalmente será un condensador o IC."
        }]
    }]
}, {
    name: "El táctil no funciona",
    step: "Medir señales de referencia",
    options: [{
        name: "Correcta medición de señales de referencia",
        step: "Medir alimentación: 1.8v, 2.8v, 3.3v",
        color: "green",
        options: [{
            name: "Correcta medición de alimentación",
            step: "Medir comunicación",
            color: "green",
            options: [{
                solution: "Si todo parece estar en orden hasta este punto, es probable que el problema resida en la CPU. Sin embargo, también podría estar relacionado con algún circuito integrado (IC) o periférico que comparta las mismas líneas de comunicación. Si aún no dispones de un osciloscopio, puedes utilizar un multímetro para medir. Recuerda que las líneas de comunicación suelen operar con un voltaje de 1.8V. Aunque la presencia de 1.8V no garantiza al 100% su correcto funcionamiento, es un indicativo relevante."
            }]
        }, {
            name: "Incorrecta medición de alimentación",
            step: "Reemplazar fuente de alimentación 'LDO - PMIC'",
            color: "red",
            options: [{
                solution: "Si el responsable de alimentar el táctil es un LDO, no olvides medir la línea de activación 'enable' que llega al LDO, y también que el propio LDO esté siendo alimentado."
            }]
        }]
    }, {
        name: "Incorrecta medición de señales de referencia",
        color: "red",
        options: [{
            solution: "Si la alteración está en una de las líneas de comunicación debemos revisar los resistores que generalmente van en esas líneas, si el valor está en OL puede ser la CPU que está desoldada, si la alteración está en una de las líneas de alimentación debemos revisar los condensadores que están en la línea alterada."
        }]
    }]
}, {
    name: "La pantalla no funciona",
    step: "Medir señales de referencia",
    options: [{
        name: "Correcta medición de señales de referencia",
        step: `Medir alimentación 
 (PMIC - LDO = 1.8V, 3V)
Buck Boost Inverter
PMI 'IF PM'
(5.5V, -5.5V)
(AMOLED = 4.6V, -4.4V, 7V)`,
        color: "green",
        options: [{
            name: "Correcta medición de alimentación",
            color: "green",
            options: [{
                solution: "Si todo parece estar en orden hasta este punto, es probable que el problema resida en la CPU. Sin embargo, también podría estar relacionado con algún circuito integrado (IC) o periférico que comparta las mismas líneas de comunicación. Si aún no dispones de un osciloscopio, puedes utilizar un multímetro para medir. Recuerda que las líneas de comunicación suelen operar con un voltaje de 1.8V. Aunque la presencia de 1.8V no garantiza al 100% su correcto funcionamiento, es un indicativo relevante."
            }]
        }, {
            name: "Incorrecta medición de alimentación",
            step: "Medir control de Buck Boost Inverter LDO",
            color: "red",
            options: [{
                name: "Correcta medición del control de Buck Boost Inverter LDO",
                step: "Reemplazar Boost Inverter LDO o PMI",
                color: "green",
                options: [{
                    solution: "Recuerda que la señal de control 'ENABLE, EL_ON' se origina en la CPU. Si esta señal se ha perdido, es posible encontrar otra línea de activación que opere al mismo tiempo. Por ejemplo, podrías utilizar la línea del táctil o la del retroiluminado como alternativa. Si, a pesar de reemplazar el chestnut 'PMIC de LCD', los voltajes aún no están presentes, es necesario examinar las líneas de comunicación I2C."
                }]
            }, {
                name: "Incorrecta medición del control de Buck Boost Inverter LDO",
                step: "Seguimiento a lineas de control 'CPU, LCD'",
                color: "red",
                options: [{
                    solution: "En determinadas situaciones, el responsable de suministrar los voltajes de 1.8V y 3.0V, especialmente en pantallas Amoled, es un LDO. Asegúrate de medir la línea de activación 'enable' que llega al LDO y verifica que el propio LDO esté recibiendo alimentación. Por lo general, esta línea 'enable' proviene de la CPU. Pero ten en cuenta que en dispositivos Samsung y Apple, es la propia pantalla LCD la que activa el Chestnut 'Buck Inverter'. "
                }]
            }]
        }]
    }, {
        name: "Incorrecta medición de señales de referencia",
        color: "red",
        options: [{
            solution: "Si la alteración está en una de las líneas de MIPI debemos revisar los Filtros EMI que generalmente van en esas lineas, si el valor está en OL puede ser la CPU que está desoldada, si la alteración está en una de las líneas de alimentación debemos revisar los Condensadores que están en una línea altereada."
        }]
    }]
}, {
    name: "El Backlight no funciona",
    step: "Medir señales de referencia: Anodo catodos",
    options: [{
        name: "Correcta medición de señales de referencia: Anodo Catodos",
        step: "Medir alimentación Anodo = Voltaje de bateria 4v",
        color: "green",
        options: [{
            name: "Correcta medición de alimentación Anodo = 4v",
            step: "Revisar driver backlight 'BOOST O PMI'",
            color: "green",
            options: [{
                solution: "Si hasta acá está todo bien, generalmente el daño está en el driver de backlight. El driver de backlight, en algunos equipos viene embebido dentro del IF_PMIC, lo podemos reconocer porque cerva va a estar la bobina de SW y el diodo schottky."
            }]
        }, {
            name: "Incorrecta medición de alimentación Anodo = 4v",
            step: "Revisar diodo schottky, bobina",
            color: "red",
            options: [{
                solution: "Para medir este voltaje, basta con que el equipo esté alimentado, es decir no es necesario que este encendido, pues este voltaje viene desde la línea Main 'VPH_PWR, VBAT, B_PLUS, VDD_MAIN' bueno como guste llamarla... Es muy común que antes del conector del lcd 'FPC_LCD' esta línea de Anodo Ileve un filtro, es decir, una pequeña bobina, que también debes revisar."
            }]
        }]
    }, {
        name: "Incorrecta medición de señales de referencia: Anodo Catodos",
        color: "red",
        options: [{
            solution: "Generalmente el Anodo mide un valor menor que los Catodos, Anodo cerca de 500mV, Catodos cerca de 600mV, tener en cuenta el detalle de los ic de luz de configuracion antigua. Si la alteración es hacia arriba y está en la línea del Anodo, revisar filtro 'bobina'. Diodo Schottky y Bobina de SW, si, por el contrario, está alterado el valor hacia abajo, revisar condensadores y/o driver de backlight."
        }]
    }]
}, {
    name: "No enciende",
    step: "Conectar a fuente de poder 4V - 3A",
    options: [{
        name: "Consumo total de 3A",
        step: "Medir señal de referencia en VBATT 'Contacto positivo de batería'",
        options: [{
            name: "Hay corto al medir sañal de referencia en VBATT",
            step: "Verificar que componente se sobrecalienta y reemplazarlo",
            options: [{
                solution: "Siempre va a calentar un componente, si no calienta, tal vez necesites poner más corriente 'amperaje' o estás usando un cable muy delgado para inyectar corriente."
            }]
        }, {
            name: "No hay corto al medir sañal de referencia en VBATT",
            step: `Buscar corto en: VCC MAIN, VDD MAIN, VPH POWER, B PLUS, VBAT, VSYS, BL_ANODE, PP VDD BOOST
Inyectar voltaje en la línea en corto '4V-1A'`,
            options: [{
                solution: "Verificar que componente se sobrecalienta, si el corto está en un condensador, al retirarlo debería encender el equipo, pero recuerda instalar nuevamente un condensador."
            }]
        }]
    }, {
        name: "Consumo inicial sin pulsar tecla de encendido",
        step: "Inspección visual. Buscar rastros de humedad 'sulfato'",
        options: [{
            name: "Hay rastro de humedad 'sulfato'",
            options: [{
                solution: "Retirar los IC y cambiar la soldadura 'REBALLING'."
            }]
        }, {
            name: "No hay rastro de humedad 'sulfato'",
            step: "Buscar corto o fugas alrededor de SUBPMIC o PMIC",
            options: [{
                name: "Hay corto alrededor de SUBPMIC O PMIC.",
                step: "Inyectar voltaje a la linea en corto y hacer diagnostico térmico",
                options: [{
                    solution: "Algún componente deberia calentar y con rosin podemos ver cuál es el que está en corto, si no se logra ver hay que poner mas corriente en la fuente."
                }]
            }, {
                name: "Hay fugas alrededor de SUBPMIC O PMIC.",
                options: [{
                    solution: "Diagnostico termico inyectar voltaje. 'La misma tensión que maneje la línea'."
                }]
            }]
        }]
    }, {
        name: "No hay consumo al pulsar tecla de encendido",
        step: `Verificar si enciende
Con un estado alto = 1 lógico
Con un estado bajo = 0 lógico`,
        options: [{
            name: "Enciende en estado alto (1 LOGICO)",
            step: "Medir el voltaje 4V en PWR KEY 'Tecla de encendido'",
            options: [{
                name: "Correcta medición del voltaje '4v' en PWR_KEY 'Tecla de encendido'",
                step: "Medir señal de referencia 'PWR ON' en tecla de encendido",
                color: "green",
                options: [{
                    name: "Correcta medición de señal de referencia 'PWR_ON' en tecla de encendido",
                    color: "green",
                    options: [{
                        solution: "Resoldar o cambiar PMIC o SUBPMIC."
                    }]
                }, {
                    name: "Incorrecta medición de señal de referencia 'PWR_ON' en tecla de encendido",
                    step: "Seguir la linea PWR_ON a traves del resistor. Resoldar o cambiar el componente",
                    color: "red",
                    options: [{
                        solution: "Esta linea generalmente lleva un resistor en serie de 1K y puede alterarse su valor o incluso abrirse."
                    }]
                }]
            }, {
                name: "Incorrecta medición del voltaje '4v' en PWR_KEY 'Tecla de encendido'.",
                step: "Medir señal de referencia en pin PWR_KEY, seguir la linea de alimentación de PWR_KEY",
                color: "red",
                options: [{
                    solution: "Si el valor de referencia no está presente, probablemente la línea está abierta, una solución rápida es poner un resistor de 1K conectado entre la tecla y la linea de voltaje principal 'VPH_PWR'."
                }]
            }]
        }, {
            name: "Enciende en estado bajo (0 LOGICO)",
            step: "Medir voltaje 1.8V y GND en PWR_KEY",
            options: [{
                name: "Correcto voltaje '1.8v' y GND en PWR_KEY",
                step: "Resoldar o cambiar PMIC o SUBPMIC",
                color: "green",
                options: [{
                    solution: "Lo mejor es cambiar de una vez el PMIC, sobre todo para ahorrar tiempo, pero si no tenemos otro PMIC, recomendamos reballing."
                }]
            }, {
                name: "Incorrecto voltaje '1.8v' y GND en PWR_KEY",
                step: "Medir señal de referencia en pin PWR_KEY, seguir la linea PWR_ON a través del resistor",
                color: "red",
                options: [{
                    solution: "Este valor de referencia, en ocasiones es tan alto, que midiendo como siempre lo hacemos en funcion de diodo, nos dará 'OL', si este es el caso mide en función de OHM, en la escala alta o en auto si tu multímetro es autorrango. Resoldar o cambiar PMIC o SUBPMIC. Si la línea de PWR_ON está perdida, la solución es hacer un jumper desde el pad debajo del PMIC hasta el resistor de PWR_ON."
                }]
            }]
        }]
    }, {
        name: "Hay consumo al pulsar tecla de encendido",
        options: [{
            name: "Hay consumo (0.200A) mayor a 200mA",
            step: "Hacer diagnostico térmico. Si el consumo es mayor a 0.300A generalmente es corto o fuga en lineas secundarias",
            options: [{
                solution: "Al medir las lineas secundarias, hay algunas de estas lineas, principalmente las BUCK que miden muy bajo y no necesariamente tienen fuga, lo mejor es comparar con otra tarjeta que esté encendiendo."
            }]
        }, {
            name: "No hay consumo (0.200A) menor a 200mA",
            step: "Buscar corto o fugas alrededor de SUBPMIC o PMIC",
            options: [{
                name: "Hay cortos o fugas alrededor de PMIC o SUBPMIC",
                options: [{
                    solution: "Diagnostico térmico y/o método Kelvin, inyectar la misma tensión 'voltaje' que maneja la línea."
                }]
            }, {
                name: "No hay cortos o fugas alrededor de PMIC o SUBPMIC",
                step: "Medir cristal oscilador de PMIC",
                options: [{
                    name: "Correcta medición del cristal de oscilador de PMIC",
                    step: "Medir voltajes BUCK, LDO, PMIC, IF-PMIC Y SUBPMIC",
                    color: "green",
                    options: [{
                        name: "Correcta medición de voltajes BUCK, LDO, PMIC, IF-PMIC Y SUBPMIC",
                        color: "green",
                        options: [{
                            solution: "Memoria o CPU. Recuerda que en este paso puedes descartar la CPU, midiendo la linea CLK de la CPU hacia la memoria, normalmente hay un testpoint cerca de la memoria, si está bien la sincronización, es problema de la memoria."
                        }]
                    }, {
                        name: "Incorrecta medición de voltajes BUCK, LDO, PMIC, IF-PMIC Y SUBPMIC",
                        step: "Medir referencia en la línea ausente",
                        options: [{
                            name: "Hay corto o fuga al medir referencia en la linea ausente.",
                            step: "Diagnostico térmico y/o método Kelvin",
                            options: [{
                                solution: "Inyectar la misma tensión 'voltaje' que maneja la línea donde esta el corto o la fuga."
                            }]
                        }, {
                            name: "No hay corto o fuga al medir referencia en la linea ausente.",
                            options: [{
                                solution: "Resoldar o reemplazar PMIC o SUBPMIC."
                            }]
                        }]
                    }]
                }, {
                    name: "Incorrecta medición del cristal de oscilador de PMIC",
                    step: "Reemplazar cristal de oscilador",
                    color: "red",
                    options: [{
                        solution: "Tener en cuenta que algunos cristales oscilan sin necesidad de dar PWR, es decir, solo con alimentar el equipo ya están trabajando, pero hay otros que si debemos dar PWR."
                    }]
                }]
            }]
        }]
    }, {
        name: "Consumo fijo al pulsar el botón de encendido",
        step: "Buscar corto o fugas en líneas secundarias en PMIC, IF PMIC, SUBPMIC",
        options: [{
            name: "Hay corto o fuga en lineas secundarias en PMIC, IF-PMIC y SUBPMIC.",
            step: "Diagnóstico térmico 'inyectar la tensión que maneja la línea'",
            options: [{
                solution: "La forma más correcta de confirmar si realmente hay fuga es comparando el valor con otra tarjeta de las mismas."
            }]
        }, {
            name: "No hay corto o fuga en lineas secundarias en PMIC, IF-PMIC y SUBPMIC.",
            step: "Generalmente es problema de la memoria",
            options: [{
                solution: "Podemos medir con el osciloscopio la linea de CLK de la memoria, si esta bien es problema de la memoria, o incluso poner esta linea a tierra y ver si el PC reconoce el equipo 'si genera un puerto' de ser asi es problema de memoria."
            }]
        }]
    }]
}, {
    name: "No carga la bateria",
    step: "Medir señales de referencia: VBUS, DM, DP, CCI, CC2, ID y GND",
    options: [{
        name: "Correcta medición de señales de referencia: VBUS, DM, DP, CCI, CC2, ID y GND",
        step: "Hacer seguimiento al voltaje por la linea VBUS, OVP, PMI y PM",
        color: "green",
        options: [{
            solution: "Este voltaje debemos medirlo con el equipo conectado al cargador, pero sin bateria, empezando desde el conector de carga 'VBUS'. Reemplazar componentes defectuosos. Si el voltaje llega a un IC, pero no sale de el significa que ese IC está defectuoso, del OVP debe salir el mismo voltaje que llega '5v'."
        }]
    }, {
        name: "Incorrecta medición de señales de referencia: VBUS, DM, DP, CCI, CC2, ID y GND",
        color: "red",
        options: [{
            solution: "Alterada hacia arriba 'serie' o alterada hacia abajo 'paralelo'. Si encontramos acá la falla, por ejemplo un valor muy bajo, generalmente es un diodo o un condensador o el mismo OVP."
        }]
    }]
}, {
    name: "Hay carga falsa de bateria",
    step: "Verificar consumo en VBATT 'Batería'",
    options: [{
        name: "Hay consumo en VBATT 'Bateria'",
        step: "Buscar componentes en corto y/o en fuga: PMIC, SUBPMIC, IC Carga",
        options: [{
            solution: "Podemos inyectar corriente a la linea con una tensión de 4V y hacer un diagnóstico térmico."
        }]
    }, {
        name: "No hay consumo en VBATT 'Bateria'",
        step: "Verificar consumo en VBUS TESTER USB",
        options: [{
            name: "Sobre consumo o consumo normal en VBUS Tester USB",
            step: "Buscar componentes en corto y/o fuga en VBUS (Método térmico, método Kélvin)",
            options: [{
                solution: "Para verificar cuál es el componente defectuoso, debemos inyectar corriente con una tensión de 5V, utilizando la fuente de poder."
            }]
        }, {
            name: "Bajo consumo (debajo de los 500mA) o no consumo en VBUS Tester USB",
            step: "Revisar sensores de temperatura y humedad",
            options: [{
                solution: "Revisar 'Termistor' y también el sensor de humedad 'generalmente es el codec de audio, el encargado de censar la humedad'. También debemos revisar el condensador BOOT, este es responsable de producir la carga falsa, recuerda que lo identificas porque va conectado a la bobina de carga y no lleva GND."
            }]
        }]
    }]
}, {
    name: "No hay carga rápida de bateria",
    step: "Revisar linea de datos DM, DP, CC1, CC2",
    options: [{
        name: "Correcta revisión de linea de datos DM, DP, CC1, CC2",
        step: "Revisar sensores de temperatura y humedad",
        color: "green",
        options: [{
            name: "Correcta revisión de sensores (temperatura y humedad)",
            color: "green",
            options: [{
                solution: "Reemplazar administrador de carga."
            }]
        }, {
            name: "Incorrecta revisión de sensores (temperatura y humedad)",
            step: "Reemplazar sensores",
            color: "red",
            options: [{
                solution: "El sensor de temperatura no está conformado solo por el termistor, tambien hay un resistor conectado al termistor, y su valor es generalmente el mismo del termistor, tambien el voltaje de 1.8V que debe llegar al resistor."
            }]
        }]
    }, {
        name: "Incorrecta revisión de linea de datos DM, DP, CC1, CC2",
        color: "red",
        options: [{
            solution: "Alterada hacia arriba 'serie' o alterada hacia abajo 'paralelo'. En estas lineas encontramos unos resistores en serie, su valor generalmente es de 2.2 OHM , es decir dan continuidad, si el valor está alterado hacia abajo revisar los diodos TVS."
        }]
    }]
}, {
    name: "No funciona el altavoz",
    step: "Medir valores de referencia",
    options: [{
        name: "Correcta medición de valores de referencia (SPK_OUT_P y SPK_OUT_N)",
        step: "Revisar amplificador de audio",
        color: "green",
        options: [{
            name: "Correcta revisión de amplificador de audio",
            step: "Revisar codec de audio - PMIC",
            color: "green",
            options: [{
                solution: "El codec también, muchas veces, viene embebido en el PMIC, en ese caso debemos reemplazar el PMIC."
            }]
        }, {
            name: "Incorrecta revisión de amplificador de audio",
            step: "Reemplazar amplificador de audio",
            color: "red",
            options: [{
                solution: "Medir alrededor del IC los valores de referencia 'caidas de tensión' para comprobar que no haya algún corto o fuga en un componente que tenga relación con el amplificador."
            }]
        }]
    }, {
        name: "Incorrecta medición de valores de referencia (SPK_OUT_P y SPK_OUT_N)",
        color: "red",
        options: [{
            solution: "Alterada hacia arriba 'serie' o alterada hacia abajo 'paralelo'. Lo más frecuente es que se alteren hacia arriba 'valor muy alto o sin medida' si este es el caso revisar los filtros de altavoz 'bobinas', si están alteradas hacia abajo o corto, revisar el amplificador de audio."
        }]
    }]
}, {
    name: "No funciona el audio en llamadas",
    step: "Medir señales de referencia",
    options: [{
        name: "Correcta medición de señales de referencia (RCV_P y RCV_N)",
        step: "Revisar codec de audio",
        color: "green",
        options: [{
            name: "Correcta revisión de codec de audio",
            step: "Revisar comunicación",
            color: "green",
            options: [{
                solution: "Si aún no tienes osciloscopio, mide con el multímetro, recuerda que generalmente las líneas de comunicación manejan un voltaje de 1.8V."
            }]
        }, {
            name: "Incorrecta revisión de codec de audio",
            step: "Reemplazar codec de audio",
            color: "red",
            options: [{
                solution: "Cuando falla el codec, generalmente tenemos problemas en más de una de las funciones de audio 'Altavoz, Micrófonos, Auricular, etc.'"
            }]
        }]
    }, {
        name: "Incorrecta medición de señales de referencia (RCV_P y RCV_N)",
        color: "red",
        options: [{
            solution: "Alterada hacia arriba 'serie' o alterada hacia abajo 'paralelo'. Lo más común es que haya puesto defectuoso uno de los filtros 'bobinas' de audio, de ser así el valor estaría más alto de lo normal o incluso abierta OL, si está alterada hacia abajo, normalmente en un diodo TVS."
        }]
    }]
}, {
    name: "El micrófono no funciona",
    step: "Medir valores de referencia (MAIN_MIC_P, MAIN_MIC_N y MAIN_MICBIAS_1P8)",
    options: [{
        name: "Correcta medición de valores de referencia (MAIN_MIC_P, MAIN_MIC_N y MAIN_MICBIAS_1P8)",
        step: "Revisar alimentación 1.8V - 2.8V",
        color: "green",
        options: [{
            name: "Correcta revisión de alimentación",
            color: "green",
            options: [{
                solution: "Revisar codec de audio."
            }]
        }, {
            name: "Incorrecta revisión de alimentación",
            step: "Revisar administrador de voltaje 'Codec'",
            color: "red",
            options: [{
                solution: "Quien envía este voltaje el micrófono es el codec, pero recuerda que algunos equipos traen el codec dentro del PMIC."
            }]
        }]
    }, {
        name: "Incorrecta medición de valores de referencia (MAIN_MIC_P, MAIN_MIC_N y MAIN_MICBIAS_1P8)",
        color: "red",
        options: [{
            solution: "Alterada hacia arriba 'serie' o alterada hacia abajo 'paralelo'. En algunos equipos en la línea MAIN_MIC_P, va un condensador en serie, por lo tanto, la medida será OL, debemos verificar que haya continuidad desde el pad del micrófono hasta el condensador y en el otro pin del condensador debe medir la caída de tensión normal."
        }]
    }]
}, {
    name: "SIMCARD no funciona",
    step: "Medir señales de referencia (VCC, RST, CLK, I/O y GND)",
    options: [{
        name: "Correcta medición de señales de referencia (VCC, RST, CLK, I/O y GND)",
        step: "Medir señal detect",
        color: "green",
        options: [{
            name: "Correcta medición de señal detect",
            step: "Medir alimentación: 1.8V 3.0V",
            color: "green",
            options: [{
                name: "Correcta medición de alimentación 1.8V 3.0V",
                color: "green",
                options: [{
                    solution: "Medir comunicación RST, I/O y CLK"
                }]
            }, {
                name: "Incorrecta medición de alimentación 1.8V 3.0V",
                step: "Reemplazar fuente de alimentación 'PMIC, NFC'",
                color: "red",
                options: [{
                    solution: "La fuente de alimentación de la SIM, puede ser el PMIC_RF, el NFC o el PMIC principal, también puede enviar este voltaje."
                }]
            }]
        }, {
            name: "Incorrecta medición de señal detect",
            step: "Seguir la linea detect hasta su origen 'procesador'",
            color: "red",
            options: [{
                solution: "Esta linea viene desde el procesador de llamadas 'Baseband' que en la mayoria de equipos Android, el BB viene integrado dentro de la CPU."
            }]
        }]
    }, {
        name: "Incorrecta medición de señales de referencia (VCC, RST, CLK, I/O y GND)",
        color: "red",
        options: [{
            solution: "Alterada hacia arriba 'serie' o alterada hacia abajo 'paralelo'"
        }]
    }]
}, {
    name: "Wifi no funciona",
    step: "Verifiar corto y/o fuga en entradas y salidas del IC de WIFI",
    options: [{
        name: "Hay corto y/o fuga en entradas y salidas del IC de WIFI",
        step: "Aplicar método térmico y/o Kélvin",
        options: [{
            solution: "Para usar el método térmico, debemos inyectar corriente en la misma tensión 'voltaje' que usa la línea donde vamos a hacer el diagnóstico térmico."
        }]
    }, {
        name: "No hay corto y/o fuga en entradas y salidas del IC de Wifi",
        step: "Revisar alimentación 1.3V, 1.8V, 3.3V",
        options: [{
            name: "Hay voltaje en alimentación 1.3V, 1.8V, 3.3V",
            step: "Verificar control y comunicación",
            options: [{
                name: "Correcta verificación de líneas control y comunicación",
                color: "green",
                options: [{
                    solution: "Reemplazar IC de Wifi."
                }]
            }, {
                name: "Incorrecta verificación de líneas control y comunicación",
                step: "Seguir las lineas defectuosas hasta su origen 'CPU'",
                color: "red",
                options: [{
                    solution: "Si hasta acá está todo bien, generalmente el daño está en la CPU... aunque también puede ser algún IC o periférico que comparta las mismas líneas de comunicación."
                }]
            }]
        }, {
            name: "No hay voltaje en alimentación 1.3V, 1.8V, 3.3V",
            step: "Reemplazar el administrador de voltaje",
            options: [{
                solution: "Normalmente, el administrador de voltaje es el PMIC principal."
            }]
        }]
    }]
}, {
    name: "La radiofrecuencia no funciona",
    step: "Usar método modo avión fantasma",
    options: [{
        name: "Funciona método modo avión fantasma",
        step: "Revisar Transceiver",
        options: [{
            name: "Correcta revisión del Transceiver",
            step: "Medir alimentación 1.0V, 1.2V, 1.8V",
            color: "green",
            options: [{
                name: "Correcta medición de alimentación 1.0V, 1.2V, 1.8V",
                color: "green",
                options: [{
                    solution: "Medir comunicación."
                }]
            }, {
                name: "Incorrecta medición de alimentación 1.0V, 1.2V, 1.8V",
                step: "Reemplazar fuente de alimentación 'PMIC_RF, PMIC'",
                color: "red",
                options: [{
                    solution: "En la mayoria de equipos Android, quien alimenta el Transceiver es el PMIC principal 'MAIN PMIC'."
                }]
            }]
        }, {
            name: "Incorrecta revisión del Transceiver",
            step: "Reemplazar el Transceiver",
            color: "red",
            options: [{
                solution: "El Transceiver lo podemos identificar, con las letras que trae WTR, SDR y también por la configuración típica de sus balls 'diagonalmente'."
            }]
        }]
    }, {
        name: "No funciona método modo avión fantasma",
        step: "Reemplazar IC y/o NFC",
        options: [{
            solution: "El NFC también lo podemos descartar, activándose e intentando compartir un archivo, de esta manera podemos estar seguros si está fallando."
        }]
}]}];
window.aS = aS;