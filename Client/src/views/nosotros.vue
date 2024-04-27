<template>
    <div class="md:flex min-h-screen bg-white">
        <div class="bg-white md:border-r md:border-gray-300">
            <!-- Botón de menú para dispositivos móviles -->
            <div class="border-b border-gray-300">
                <button @click="toggleMenu" class="p-4 lg:hidden flex">
                    <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="24">
                        <path
                            d="M652.154-481.538 483.077-650.615l169.077-169.078 169.077 169.078-169.077 169.077Zm-467.539-53.847v-240h240v240h-240Zm350.77 350.77v-240h240v240h-240Zm-350.77 0v-240h240v240h-240Zm40-390.77h160v-160h-160v160Zm428.539 38.77 113-113-113-113-113 113 113 113Zm-77.769 312h160v-160h-160v160Zm-350.77 0h160v-160h-160v160Zm160-350.77Zm155.539-74.23Zm-155.539 265Zm190.77 0Z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                        <path
                            d="M12 10.586l4.293-4.293 1.414 1.414L13.414 12l4.293 4.293-1.414 1.414L12 13.414l-4.293 4.293-1.414-1.414L10.586 12 6.293 7.707l1.414-1.414L12 10.586z" />
                    </svg>
                    <p class="p-1 text-xs">Menu</p>
                </button>
            </div>
            <!-- Menú lateral -->
            <div :class="{ 'block': isMenuOpen, 'hidden': !isMenuOpen }"
                class="w-1/1 lg:block md:pt-6 md:px-12 pl-12 pb-4 pr-24 absolute md:static bg-white md:shadow-none shadow-xl">
                <!-- Añadí 'text-center' para centrar el texto -->
                <h2 class="text-sm font-semibold py-4">Documentación</h2>
                <ul>
                    <li :class="{ 'pb-2.5': true, 'text-sm': true, 'text-gray-500': true, 'text-indigo-700 font-semibold': selectedOption === 'acerca' }"
                        @click="selectOption('acerca')">
                        <a href="#/acerca" class="hover:text-black transition">Acerca de Nosotros</a>
                    </li>
                    <li :class="{ 'pb-2.5': true, 'text-sm': true, 'text-gray-500': true, 'text-indigo-700 font-semibold': selectedOption === 'preguntasFrecuentes' }"
                        @click="selectOption('preguntasFrecuentes')">
                        <a href="#/preguntasFrecuentes" class="hover:text-black transition">Preguntas Frecuentes</a>
                    </li>
                    <li :class="{ 'pb-2.5': true, 'text-sm': true, 'text-gray-500': true, 'text-indigo-700 font-semibold': selectedOption === 'nuestroEquipo' }"
                        @click="selectOption('nuestroEquipo')">
                        <a href="#/nuestroEquipo" class="hover:text-black transition">Nuestro Equipo</a>
                    </li>
                    <li :class="{ 'pb-2.5': true, 'text-sm': true, 'text-gray-500': true, 'text-indigo-700 font-semibold': selectedOption === 'privacidad' }"
                        @click="selectOption('privacidad')">
                        <a href="#/privacidad" class="hover:text-black transition">Políticas de Privacidad</a>
                    </li>
                    <li :class="{ 'pb-2.5': true, 'text-sm': true, 'text-gray-500': true, 'text-indigo-700 font-semibold': selectedOption === 'terminos' }"
                        @click="selectOption('terminos')">
                        <a href="#/terminos" class="hover:text-black transition">Términos y Condiciones</a>
                    </li>
                    <li :class="{ 'pb-2.5': true, 'text-sm': true, 'text-gray-500': true, 'text-indigo-700 font-semibold': selectedOption === 'soporte' }"
                        @click="selectOption('soporte')">
                        <a href="#/soporte" class="hover:text-black transition">Soporte</a>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Contenido principal -->
        <div class="flex-1 p-8">
            <!-- Preguntas Frecuentes -->
            <div v-if="$route.hash === '#/preguntasFrecuentes'">
                <h3 class="text-3xl font-semibold mb-4">Preguntas Frecuentes</h3>
                <div v-for="(pregunta, index) in preguntas" :key="index" class="mb-3">
                    <h4 @click="togglePregunta(index)"
                        class="cursor-pointer text-md hover:shadow-md shadow-sm font-semibold mb-0 transition p-2">
                        {{ pregunta.pregunta }}
                        <span class="float-right" :class="{ 'transform rotate-180': pregunta.abierta }">
                            ▼
                        </span>
                    </h4>
                    <ul>
                        <li v-show="pregunta.abierta" class="text-sm bg-gray-100 rounded-b-xl px-6 py-4">
                            {{ pregunta.respuesta }}
                        </li>
                    </ul>
                </div>
            </div>
            <div v-if="$route.hash === '#/nuestroEquipo'">
                <h3 class="text-3xl font-semibold mb-4">Nuestro Equipo</h3>
                <p class="md:pr-40">
                    CurSeek es impulsado por un equipo apasionado y dedicado de profesionales. Aquí te presentamos a algunos
                    de los miembros clave de nuestro equipo:
                </p>
                <div class="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    <!-- Card 1 -->
                    <div class="bg-white p-6 rounded-lg shadow-md md:mx-40 mb-4">
                        <img src="../assets/nosotros/Ramirez_Jairo.jpg"
                            alt="Imágen del Programador 1" class="w-24 object-cover mb-4 rounded-full">
                        <h4 class="text-xl font-semibold">Jairo Ramirez Dos Santos</h4>
                        <h5 class="text-sm text-gray-600 italic mb-2">Founder</h5>
                        <p class="text-black">
                            Jairo, fundador y CEO apasionado de CurSeek, canaliza su amor por la programación web hacia
                            una misión única. Originario de Venezuela y ahora radicado en Buenos Aires, ha forjado CurSeek
                            con la firme creencia de que todos merecen acceso fácil a la educación, incluso a cursos menos
                            conocidos.

                            Impulsado por la necesidad de democratizar el conocimiento, Jairo se embarcó en la creación de
                            CurSeek. Su visión se centra en hacer que cursos menos famosos y no tan solicitados estén al
                            alcance de todos. Con una mezcla de dedicación técnica y pasión por la educación, lidera CurSeek
                            para que sea una plataforma inclusiva, brindando oportunidades de aprendizaje a personas de todo
                            el mundo, sin importar la popularidad de los cursos. Su compromiso con hacer que el conocimiento
                            sea accesible destaca en el corazón de esta iniciativa única.
                        </p>
                    </div>
                    <!-- Card 2 -->
                    <div class="bg-white p-6 rounded-lg shadow-md md:mx-40 mb-4">
                        <img src="../assets/nosotros/Varas_Matias.jpg"
                            alt="Imágen del Programador 1" class="w-24 object-cover mb-4 rounded-full">
                        <h4 class="text-xl font-semibold">Matias Alejo Varas</h4>
                        <h5 class="text-sm text-gray-600 italic mb-2">Co-Founder</h5>
                        <p class="text-black">Matías, co-fundador y COO de CurSeek, desempeñando un
                            papel esencial desde los inicios del proyecto en 2023. Iniciaron esta emocionante travesía
                            juntos, construyendo CurSeek desde cero con pasión y determinación.
                            Su conexión con Jairo se forjó en la escuela DaVinci, específicamente en clases de programación
                            web. Desde la capital federal de Argentina, Matías aporta su energía y habilidades
                            excepcionales, encontrando inspiración tanto en la música como en la programación. Juntos, han
                            llevado a CurSeek a nuevos horizontes con su colaboración exitosa y dedicación compartida.
                        </p>
                    </div>
                </div>
            </div>
            <!-- Preguntas Frecuentes -->
            <div v-if="$route.hash === '#/acerca'" class="px-2 md:px-10 lg:px-20">
                <h3 class="text-3xl font-semibold mb-4">Acerca de Nosotros</h3>
                <div class="flex flex-col md:flex-row items-center justify-center mb-4">
                    <div class="w-1/1">
                        <img class="md:max-w-xs" src="../assets/team.jpg" alt="Imágen equipo team work">
                    </div>
                </div>
                <div>
                    <h3 class="text-xl font-semibold mb-2">Nuestro objetivo es hacer que la educación en línea funcione para
                        todos.</h3>
                    <p class="text-black text-md mb-4">
                        CurSeek es un directorio de cursos en línea. Recopilamos cursos de muchos proveedores para facilitar
                        la búsqueda de los mejores cursos sobre casi cualquier tema, dondequiera que existan. Sea cual sea
                        tu
                        interés de aprendizaje, es muy probable que nuestro catálogo incluya un curso que satisfaga tus
                        necesidades.
                        A través de CurSeek, puedes encontrar cursos; revisar los cursos que has tomado (y leer las reseñas
                        de otras personas); seguir universidades, temas y cursos para recibir actualizaciones
                        personalizadas; y
                        también planificar y realizar un seguimiento de tu aprendizaje.
                    </p>
                    <h3 class="text-xl font-semibold mb-2">Impulsado por la comunidad</h3>
                    <p class="text-black text-md mb-4">
                        CurSeek es una empresa remota sin oficinas físicas. Nuestro equipo está formado por aprendices cuyas
                        vidas han sido impactadas por la educación en línea. Entre todos nosotros, hemos realizado más de
                        400
                        cursos en línea y 3 grados en línea. Si nuestros nombres te resultan familiares, puede ser porque
                        hayas
                        leído artículos que hemos escrito o incluso porque uno de nosotros ha sido mentor en un curso que
                        tomaste.
                        Nuestro objetivo es hacer que la educación en línea funcione para todos, así que estamos trabajando
                        constantemente en nuevas características. Si tienes una idea para hacer que CurSeek sea más útil,
                        por
                        favor háznoslo saber.
                    </p>
                    <h3 class="text-xl font-semibold mb-2">El Informe</h3>
                    <p class="text-black text-md mb-4">
                        Estamos en el negocio de educar a las personas sobre la educación. Además de nuestro catálogo, El
                        Informe de CurSeek mantiene un seguimiento del estado general del panorama de la educación en línea.
                        Nos
                        gusta especialmente descubrir historias pasadas por alto y determinar tendencias que otros aún no
                        han
                        informado.
                    </p>
                    <h3 class="text-xl font-semibold mb-2">¿Cómo ganamos dinero?</h3>
                    <p class="text-black text-md mb-4">
                        CurSeek genera ingresos a través de la publicidad y los enlaces de afiliados. Hemos tratado de
                        indicar
                        claramente los anuncios y los resultados de búsqueda patrocinados. Ganamos una comisión cuando
                        alguien
                        hace clic en un proveedor de cursos y se actualiza a una oferta de pago. Para una parte sustancial
                        de
                        nuestro catálogo, no tenemos asociaciones de afiliados. Nuestras relaciones de afiliación y
                        publicidad
                        no influyen en la lista de cursos, ni afectan las reseñas de los usuarios. Lo más importante para
                        nosotros es mantener una relación de confianza con nuestros usuarios, por lo que queremos ser
                        transparentes sobre cómo se pagan las facturas.
                    </p>
                </div>
            </div>

            <!-- Información sobre "Políticas de Privacidad" -->
            <div v-if="$route.hash === '#/privacidad'">
                <h3 class="text-3xl font-semibold mb-4">Políticas de Privacidad</h3>
                <p>
                    Operamos el sitio web https://www.curseek.com/ (el "Servicio").
                    Esta página le informa sobre nuestras políticas con respecto a la recopilación, el uso y la divulgación
                    de datos personales cuando utiliza nuestro Servicio y las opciones que tiene asociadas con esos datos.
                    Utilizamos sus datos para proporcionar y mejorar el Servicio. Al utilizar el Servicio, usted acepta la
                    recopilación y el uso de la información de acuerdo con esta política. A menos que se defina lo contrario
                    en esta Política de privacidad, los términos utilizados en esta Política de privacidad tienen los mismos
                    significados que en nuestros Términos y condiciones, accesibles desde https://www.curseek.com/.
                </p>
                <h3 class="text-xl font-bold mb-4 mt-8">Definiciones</h3>
                <section>
                    <h3 class="text-xl font-semibold mb-4 mt-8">Servicio</h3>
                    <p>
                        El Servicio es el sitio web https://www.curseek.com/ operado por Curseek, Inc.
                    </p>
                    <h3 class="text-xl font-semibold mb-4 mt-8">Datos personales</h3>
                    <p>
                        Datos personales significa datos sobre una persona física viva que puede ser identificada a partir
                        de esos datos (o con esos datos y otra información en nuestra posesión o susceptible de entrar en
                        nuestra posesión).
                    </p>
                    <h3 class="text-xl font-semibold mb-4 mt-8">Datos de uso</h3>
                    <p>
                        Los datos de uso son datos recopilados automáticamente, generados por el uso del Servicio o por la
                        infraestructura del propio Servicio (por ejemplo, la duración de una visita a la página).
                    </p>
                    <h3 class="text-xl font-semibold mb-4 mt-8">Cookies</h3>
                    <p>
                        Las cookies son pequeños archivos de datos almacenados en su dispositivo (computadora o dispositivo
                        móvil).
                    </p>
                    <h3 class="text-xl font-semibold mb-4 mt-8">Responsable del tratamiento de datos</h3>
                    <p>
                        Responsable del tratamiento de datos significa la persona física o jurídica que (por sí sola o en
                        conjunto o en común con otras personas) determina los fines para los cuales y la manera en que se
                        procesan o se procesarán los datos personales.
                    </p>
                    <p class="pt-4">
                        A los efectos de esta Política de privacidad, somos un Responsable del tratamiento de datos de sus
                        Datos personales.
                    </p>
                    <h3 class="text-xl font-semibold mb-4 mt-8">Procesadores de datos (o Proveedores de servicios)</h3>
                    <p>
                        Procesador de datos (o Proveedor de servicios) significa cualquier persona física o jurídica que
                        procesa los datos en nombre del Responsable del tratamiento de datos.
                    </p>
                    <p class="pt-4">
                        Podemos utilizar los servicios de varios Proveedores de servicios para procesar sus datos de manera
                        más efectiva.
                    </p>
                    <h3 class="text-xl font-semibold mb-4 mt-8">Sujeto de datos (o Usuario)</h3>
                    <p>
                        Sujeto de datos es cualquier persona física que esté utilizando nuestro Servicio y sea objeto de
                        Datos personales.
                    </p>
                    <h3 class="text-xl font-semibold mb-4 mt-8">Recopilación y uso de la información</h3>
                    <p>
                        Recopilamos varios tipos diferentes de información con diversos fines para proporcionar y mejorar
                        nuestro Servicio.
                    </p>
                </section>

                <h3 class="text-xl font-bold mb-4 mt-8">Tipos de datos recopilados</h3>

                <section class="mt-8">
                    <h3 class="text-xl font-semibold mb-4 mt-8">Datos personales</h3>
                    <p>
                        Mientras utiliza nuestro Servicio, es posible que le solicitemos que nos proporcione cierta
                        información personalmente identificable que pueda usarse para contactarlo o identificarlo ("Datos
                        personales"). La información personalmente identificable puede incluir, entre otras cosas:
                    </p>

                    <ul class="p-4 list-disc">
                        <li>
                            Dirección de correo electrónico
                        </li>
                        <li>
                            Nombre y apellido
                        </li>
                        <li>
                            Foto de perfil
                        </li>
                        <li>
                            Cookies y datos de uso
                        </li>
                    </ul>

                    <p class="pt-4">
                        Podemos utilizar sus Datos personales para contactarlo con boletines informativos, material de
                        marketing o promocional y otra información que pueda ser de su interés. Puede optar por no recibir
                        ninguna o todas estas comunicaciones nuestra siguiendo el enlace para cancelar la suscripción o las
                        instrucciones proporcionadas en cualquier correo electrónico que enviemos.
                    </p>
                    <p class="pt-4">
                        Podemos recibir Información de Identificación Personal cuando usted proporcione información en
                        respuesta a una encuesta realizada por nosotros. Esto puede incluir detalles sobre su raza, su
                        historial educativo y su empleo.
                    </p>
                    <p class="pt-4">
                        Podemos recibir Información de Identificación Personal cuando accede o inicia sesión en un sitio de
                        terceros, por ejemplo, Facebook o Google, desde nuestro Servicio. Esto puede incluir el texto y/o
                        las imágenes de su Información de Identificación Personal disponibles en el sitio de terceros.
                    </p>

                    <h3 class="text-xl font-semibold mb-4 mt-8">Contenido público</h3>
                    <p>
                        La información que usted contribuye a través del Servicio está destinada a ser de consumo público,
                        incluidas sus reseñas, intereses, seguidores, transcripciones, listas y perfil de cuenta. Podemos
                        mostrar esta información a través del Servicio, compartirla con empresas y distribuirla aún más a
                        una audiencia más amplia a través de sitios y servicios de terceros.
                    </p>

                    <h3 class="text-xl font-semibold mb-4 mt-8">Datos de uso</h3>
                    <p>
                        También podemos recopilar información sobre cómo se accede y utiliza el Servicio ("Datos de uso").
                        Estos Datos de uso pueden incluir información como la dirección de protocolo de Internet de su
                        computadora (por ejemplo, dirección IP), tipo de navegador, versión del navegador, las páginas de
                        nuestro Servicio que visita, la hora y la fecha de su visita, el tiempo que pasa en esas páginas,
                        qué anuncios ha visto o ha hecho clic en ellos, identificadores únicos del dispositivo y otros datos
                        de diagnóstico. Podemos ser capaces de determinar a partir de una dirección IP el proveedor de
                        servicios de Internet de un usuario y la ubicación geográfica de su punto de conexión.
                    </p>
                    <p class="pt-4">
                        Podemos utilizar herramientas de análisis internas y de terceros, incluidos Google Analytics y
                        Clicky.
                    </p>

                    <h3 class="text-xl font-semibold mb-4 mt-8">Datos de cookies de seguimiento</h3>
                    <p>
                        Utilizamos cookies y tecnologías de seguimiento similares para rastrear la actividad en nuestro
                        Servicio y mantener cierta información. Para obtener más información sobre nuestro uso de cookies y
                        balizas web, consulte nuestra Política de cookies.
                    </p>
                    <p class="pt-4">
                        Las cookies son archivos con una pequeña cantidad de datos que pueden incluir un identificador único
                        anónimo.
                    </p>
                </section>

                <section class="mt-8">
                    <h3 class="text-xl font-bold mb-4 mt-8">Uso de datos</h3>
                    <p>
                        No vendemos sus datos personales, como su nombre e información de contacto, a terceros para su uso
                        en sus propios fines de marketing.
                    </p>
                    <p class="pt-4">
                        Curseek, Inc utiliza los datos recopilados para diversos fines:
                    </p>

                    <ul class="p-4 list-disc">
                        <li>Para proporcionar y mantener nuestro Servicio</li>
                        <li>Para notificarle sobre cambios en nuestro Servicio</li>
                        <li>Para permitirle participar en funciones interactivas de nuestro Servicio cuando decida hacerlo
                        </li>
                        <li>Para brindar soporte al cliente</li>
                        <li>Para recopilar análisis o información valiosa para que podamos mejorar nuestro Servicio</li>
                        <li>Para realizar análisis estadísticos del uso de nuestros Servicios</li>
                        <li>Para monitorear el uso de nuestro Servicio</li>
                        <li>Para detectar, prevenir y abordar problemas técnico</li>
                        <li>Para enviarle actualizaciones (como fechas de inicio de cursos o notificaciones de nuevos
                            cursos), recomendaciones, basadas en sus intereses y seguidores, así como información general, a
                            menos que haya optado por no recibir dicha información
                        </li>
                        <li>Para personalizar el Servicio</li>
                    </ul>

                    <p class="pt-4">
                        Utilizamos varios proveedores de servicios, vendedores y contratistas (colectivamente,
                        "Contratistas") para ayudarnos a proporcionar nuestros productos y servicios a usted. Nuestros
                        Contratistas pueden tener acceso limitado a su Información de Identificación Personal en el curso de
                        la prestación de sus productos o servicios para nosotros, de modo que a su vez podamos proporcionar
                        nuestros productos y servicios a usted. Estos Contratistas pueden incluir proveedores y proveedores
                        que nos proporcionan tecnología, servicios y/o contenido relacionados con la operación y el
                        mantenimiento del Sitio o el Curso en línea. El acceso a su Información de Identificación Personal
                        por parte de estos contratistas se limita a la información razonablemente necesaria para que el
                        contratista realice su función limitada para nosotros.
                    </p>
                    <p class="pt-4">
                        Podemos compartir información agregada o desidentificada con terceros para fines de investigación,
                        marketing, análisis y otros fines, siempre que dicha información no identifique a un individuo en
                        particular.
                    </p>
                </section>

                <section class="mt-8">
                    <h3 class="text-xl font-bold mb-4 mt-8">
                        Base legal para el tratamiento de datos personales según el Reglamento General de Protección de
                        Datos (GDPR)
                    </h3>
                    <p>
                        Si usted es de la Comunidad Económica Europea (EEA), la base legal de Curseek, Inc para recopilar y
                        utilizar la información personal descrita en esta Política de privacidad depende de los Datos
                        personales que recopilamos y del contexto específico en el que recopilamos dichos datos.
                    </p>
                    <p class="pt-4">
                        Curseek, Inc puede procesar sus Datos personales porque:
                    </p>
                    <ul class="p-4 list-disc">
                        <li>Necesitamos realizar un contrato con usted</li>
                        <li>Usted nos ha dado permiso para hacerlo</li>
                        <li>El procesamiento está en nuestros intereses legítimos y no se ve anulado por sus derechos</li>
                        <li>Para cumplir con la ley</li>
                    </ul>
                </section>

                <section class="mt-8">
                    <h3 class="text-xl font-bold mb-4">Conservación de los datos</h3>
                    <p>
                        Curseek, Inc conservará sus Datos personales solo durante el tiempo que sea necesario para los fines
                        establecidos en esta Política de privacidad. Conservaremos y utilizaremos sus Datos personales en la
                        medida en que sea necesario para cumplir con nuestras obligaciones legales (por ejemplo, si estamos
                        obligados a conservar sus datos para cumplir con las leyes aplicables), resolver disputas y hacer
                        cumplir nuestros acuerdos legales y políticas.
                    </p>
                    <p class="pt-4">
                        Curseek, Inc también conservará los Datos de uso con fines de análisis internos. Los Datos de uso
                        generalmente se conservan por un período de tiempo más corto, excepto cuando estos datos se utilizan
                        para fortalecer la seguridad o mejorar la funcionalidad de nuestro Servicio, o estamos legalmente
                        obligados a conservar estos datos por períodos de tiempo más largos.
                    </p>
                </section>

                <section class="mt-8">
                    <h3 class="text-xl font-bold mb-4">Transferencia de datos</h3>
                    <p>
                        Su información, incluidos los Datos personales, puede transferirse a —y mantenerse en— computadoras
                        ubicadas fuera de su estado, provincia, país u otra jurisdicción gubernamental donde las leyes de
                        protección de datos pueden diferir de las de su jurisdicción.
                    </p>
                    <p class="pt-4">
                        Si se encuentra fuera de los Estados Unidos y decide proporcionarnos información, tenga en cuenta
                        que transferimos los datos, incluidos los Datos personales, a Estados Unidos y los procesamos allí.
                    </p>
                    <p class="pt-4">
                        Su consentimiento a esta Política de privacidad seguido de su envío de dicha información representa
                        su acuerdo con esa transferencia.
                    </p>
                    <p class="pt-4">
                        Curseek, Inc tomará todas las medidas razonablemente necesarias para garantizar que sus datos sean
                        tratados de forma segura y de acuerdo con esta Política de privacidad y que no se realizará ninguna
                        transferencia de sus Datos personales a una organización o un país a menos que existan controles
                        adecuados, incluida la seguridad de sus datos y otra información personal.
                    </p>
                </section>

                <h3 class="text-xl font-bold mb-4 mt-8">Divulgación de datos</h3>

                <section class="mt-8">
                    <h3 class="text-xl font-bold mb-4">Transacción comercial</h3>
                    <p>
                        Si Curseek, Inc está involucrado en una fusión, adquisición o venta de activos, sus Datos personales
                        pueden ser transferidos. Le notificaremos antes de que sus Datos personales sean transferidos y se
                        conviertan en objeto de una Política de privacidad diferente.
                    </p>
                </section>

                <section class="mt-8">
                    <h3 class="text-xl font-bold mb-4">Divulgación para hacer cumplir la ley</h3>
                    <p>
                        En determinadas circunstancias, Curseek, Inc puede verse obligada a divulgar sus Datos personales si
                        así lo exige la ley o en respuesta a solicitudes válidas de autoridades públicas (por ejemplo, un
                        tribunal o un organismo gubernamental).
                    </p>
                </section>

                <section class="mt-8">
                    <h3 class="text-xl font-bold mb-4">Requisitos legales</h3>
                    <p>
                        Curseek, Inc puede divulgar sus Datos personales con la creencia de buena fe de que dicha acción es
                        necesaria para:
                    </p>

                    <ul class="p-4 list-disc">
                        <li>Cumplir con una obligación legal</li>
                        <li>Proteger y defender los derechos o propiedades de Curseek, Inc</li>
                        <li>Prevenir o investigar posibles infracciones en relación con el Servicio</li>
                        <li>Proteger la seguridad personal de los usuarios del Servicio o del público</li>
                        <li>Proteger contra la responsabilidad legal</li>
                    </ul>
                </section>

                <section class="mt-8">
                    <h3 class="text-xl font-bold mb-4">Seguridad de los datos</h3>
                    <p>
                        La seguridad de sus datos es importante para nosotros, pero recuerde que ningún método de
                        transmisión a través de Internet o método de almacenamiento electrónico es 100% seguro. Si bien nos
                        esforzamos por utilizar medios comercialmente aceptables para proteger sus Datos personales, no
                        podemos garantizar su seguridad absoluta.
                    </p>
                </section>

                <section class="mt-8">
                    <h3 class="text-xl font-bold mb-4">Señales de "No hacer seguimiento"</h3>
                    <p>
                        No admitimos las señales de "No hacer seguimiento" ("DNT"). No hacer seguimiento es una preferencia
                        que puede establecer en su navegador web para informar a los sitios web que no desea ser rastreado.
                    </p>
                    <p class="pt-4">
                        Puede habilitar o deshabilitar No rastrear visitando la página de Preferencias o Configuración de su
                        navegador web.
                    </p>
                </section>

                <section class="mt-8">
                    <h3 class="text-xl font-bold mb-4">Sus derechos de protección de datos en virtud del Reglamento General
                        de Protección de Datos (GDPR)
                    </h3>
                    <p>
                        Si es residente de la Comunidad Económica Europea (EEA), tiene ciertos derechos de protección de
                        datos. Curseek, Inc tiene como objetivo tomar medidas razonables para permitirle corregir,
                        modificar, eliminar o limitar el uso de sus Datos personales.
                    </p>
                    <p class="pt-4">
                        Si desea saber qué Datos personales tenemos sobre usted y desea que se eliminen de nuestros
                        sistemas, comuníquese con nosotros.
                    </p>
                    <p class="pt-4">
                        En ciertas circunstancias, tiene los siguientes derechos de protección de datos:
                    </p>

                    <p class="pt-4">
                        <b>El derecho de acceso, actualización o eliminación de la información que tenemos sobre usted.</b>
                        <br>
                        Siempre que sea posible, puede acceder, actualizar o solicitar la eliminación de sus Datos
                        personales directamente dentro de la sección de configuración de su cuenta. Si no puede realizar
                        estas acciones usted mismo, comuníquese con nosotros para que lo ayudemos.
                    </p>
                    <p class="pt-4">
                        <b>El derecho de rectificación.</b> Tiene derecho a que su información se corrija si esa información
                        es inexacta o está incompleta.
                    </p>
                    <p class="pt-4">
                        <b>El derecho de oposición.</b> Tiene derecho a oponerse a nuestro procesamiento de sus Datos
                        personales.
                    </p>
                    <p class="pt-4">
                        <b>El derecho de restricción.</b> Tiene derecho a solicitar que restrinjamos el procesamiento de su
                        información personal.
                    </p>
                    <p class="pt-4">
                        <b>El derecho a la portabilidad de datos.</b> Tiene derecho a que se le entregue una copia de la
                        información que tenemos sobre usted en un formato estructurado, legible por máquina y de uso común.
                    </p>
                    <p class="pt-4">
                        <b>El derecho a retirar el consentimiento.</b> También tiene derecho a retirar su consentimiento en
                        cualquier momento cuando Curseek, Inc haya confiado en su consentimiento para procesar su
                        información personal.
                    </p>
                    <p class="pt-4">
                        Tenga en cuenta que es posible que le solicitemos que verifique su identidad antes de responder a
                        dichas solicitudes.
                    </p>
                    <p class="pt-4">
                        Tiene derecho a presentar una queja ante una Autoridad de Protección de Datos sobre nuestra
                        recopilación y uso de sus Datos personales. Para obtener más información, comuníquese con su
                        autoridad local de protección de datos en la Comunidad Económica Europea (EEA).
                    </p>
                </section>

                <section class="mt-8">
                    <h3 class="text-xl font-bold mb-4 mt-8">Proveedores de servicios</h3>
                    <p>
                        Podemos contratar a empresas y personas terceras para facilitar nuestro Servicio ("Proveedores de
                        servicios"), para proporcionar el Servicio en nuestro nombre, para realizar servicios relacionados
                        con el Servicio o para ayudarnos en el análisis de cómo se utiliza nuestro Servicio.
                    </p>
                    <p class="mt-4">
                        Estas terceras partes tienen acceso a sus Datos personales solo para realizar estas tareas en
                        nuestro nombre y están obligadas a no divulgarlos ni utilizarlos para ningún otro propósito. Aquí
                        hay una lista de Proveedores de servicios utilizados por Curseek.
                    </p>
                </section>

                <section class="mt-8">
                    <h3 class="text-xl font-bold mb-4 mt-8">Enlaces a otros sitios</h3>
                    <p>
                        Nuestro Servicio puede contener enlaces a otros sitios que no son operados por nosotros. Si hace
                        clic en un enlace de un tercero, será dirigido al sitio de ese tercero. Le recomendamos
                        encarecidamente que revise la Política de privacidad de cada sitio que visite.
                    </p>
                    <p class="mt-4">
                        No tenemos control sobre y no asumimos responsabilidad alguna por el contenido, las políticas de
                        privacidad o las prácticas de sitios o servicios de terceros.
                    </p>
                </section>

                <section class="mt-8">
                    <h3 class="text-xl font-bold mb-4 mt-8">Privacidad de los niños</h3>
                    <p>
                        Nuestro Servicio no está dirigido a personas menores de 13 años ("Niños").
                    </p>
                    <p class="mt-4">
                        No recopilamos deliberadamente información de identificación personal de personas menores de 13
                        años. Si usted es padre/madre/tutor y sabe que su hijo nos ha proporcionado información personal,
                        comuníquese con nosotros. Si nos damos cuenta de que hemos recopilado información personal de
                        menores sin verificación del consentimiento parental, tomamos medidas para eliminar esa información
                        de nuestros servidores.
                    </p>
                </section>

                <section class="mt-8">
                    <h3 class="text-xl font-bold mb-4 mt-8">Cambios en esta Política de privacidad</h3>
                    <p>
                        Es posible que actualicemos nuestra Política de privacidad de vez en cuando. Le notificaremos
                        cualquier cambio publicando la nueva Política de privacidad en esta página.
                    </p>
                    <p class="mt-4">
                        Le informaremos por correo electrónico y/o mediante un aviso destacado sobre nuestro Servicio, antes
                        de que el cambio entre en vigencia y actualizaremos la "fecha efectiva" en la parte superior de esta
                        Política de privacidad.
                    </p>
                    <p class="mt-4">
                        Le recomendamos que revise esta Política de privacidad periódicamente para ver si hay cambios. Los
                        cambios en esta Política de privacidad son efectivos cuando se publican en esta página.
                    </p>
                </section>

                <section class="mt-8">
                    <h3 class="text-xl font-bold mb-4 mt-8">Contactanos</h3>
                    <p>
                        Si tienes alguna pregunta sobre esta Política de privacidad, contáctanos por correo electrónico a
                        <a href="mailto:support@curseek.com"
                            class="hover:text-blue-600 transition underline">support@curseek.com</a>
                    </p>
                </section>

            </div>
            <!-- Información sobre "Términos y Condiciones" -->
            <div v-if="$route.hash === '#/terminos'">
                <h3 class="text-3xl font-semibold mb-4">Términos y Condiciones</h3>
                <p>
                    Bienvenido a Curseek. Al acceder y utilizar nuestro sitio web (el "Servicio"), aceptas cumplir y estar
                    sujeto a los siguientes términos y condiciones de uso ("Términos"). Si no estás de acuerdo con alguno de
                    estos términos, no podrás acceder al Servicio.
                </p>
                <section>
                    <h3 class="text-xl font-bold mb-4 mt-8">Uso del Servicio</h3>
                    <p>
                        El acceso al Servicio se otorga de forma temporal, y nos reservamos el derecho de retirar o
                        modificar el Servicio sin previo aviso. No seremos responsables si por cualquier motivo el Servicio
                        no está disponible en un momento dado o por un período determinado.
                    </p>
                </section>

                <section class="mt-8">
                    <h3 class="text-xl font-bold mb-4">Propiedad Intelectual</h3>
                    <p>
                        El Servicio y su contenido, características y funcionalidades originales son propiedad de Curseek y
                        están protegidos por derechos de autor, marcas registradas y otras leyes de propiedad intelectual
                        tanto en Argentina como en otros países.
                    </p>
                </section>

                <section class="mt-8">
                    <h3 class="text-xl font-bold mb-4">Enlaces a Terceros</h3>
                    <p>
                        Nuestro Servicio puede contener enlaces a sitios web de terceros que no son propiedad ni están
                        controlados por Curseek. No tenemos control sobre, y no asumimos responsabilidad alguna por el
                        contenido, las políticas de privacidad o las prácticas de sitios o servicios de terceros.
                    </p>
                </section>

                <section class="mt-8">
                    <h3 class="text-xl font-bold mb-4">Limitación de Responsabilidad</h3>
                    <p>
                        En ningún caso Curseek, sus directores, empleados, socios o afiliados serán responsables ante ningún
                        tercero por daños indirectos, incidentales, especiales, consecuentes o punitivos, incluidos, entre
                        otros, la pérdida de beneficios, datos, uso, buena voluntad u otras pérdidas intangibles, que surjan
                        del uso o la imposibilidad de uso del Servicio.
                    </p>
                </section>

                <section class="mt-8">
                    <h3 class="text-xl font-bold mb-4">Cambios en los Términos</h3>
                    <p>
                        Nos reservamos el derecho, a nuestra sola discreción, de modificar o reemplazar estos Términos en
                        cualquier momento. Si una revisión es material, intentaremos proporcionar un aviso de al menos 30
                        días antes de que los nuevos términos entren en vigencia. Lo que constituye un cambio material se
                        determinará a nuestra sola discreción.
                    </p>
                </section>

                <section class="mt-8">
                    <h3 class="text-xl font-bold mb-4">Contactanos</h3>
                    <p>
                        Si tienes alguna pregunta sobre estos Términos y Condiciones, contáctanos por correo electrónico a
                        <a href="mailto:support@curseek.com"
                            class="hover:text-blue-600 transition underline">support@curseek.com</a>
                    </p>
                </section>
            </div>
            <!-- Información sobre "soporte" -->
            <div v-if="$route.hash === '#/soporte'">
                <h3 class="text-3xl font-semibold mb-4">Soporte</h3>
                <p class="pb-4">
                    ¡Estamos aquí para ayudarte!
                    Ponte en contacto con nuestro equipo de soporte.
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- Tarjeta para el correo electrónico -->
                    <div class="bg-white p-4 rounded-lg shadow-md">
                        <h4 class="text-lg font-semibold mb-2">Correo Electrónico</h4>
                        <p>
                            ¿Tienes preguntas o comentarios? Estamos aquí para ayudarte.
                            Ponte en contacto con nuestro equipo:
                        </p>
                        <a href="mailto:support@curseek.com" class="text-blue-500 hover:underline">support@curseek.com</a>
                    </div>
                    <!-- Tarjeta para el número de teléfono -->
                    <div class="bg-white p-4 rounded-lg shadow-md">
                        <h4 class="text-lg font-semibold mb-2">Número de Teléfono</h4>
                        <p>
                            ¿Prefieres hablar directamente con nosotros? Llámanos o envía un SMS al siguiente número:
                        </p>
                        <a href="tel:1122559115" class="text-blue-500 hover:underline">+54 11 22559115</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Documentacion',
    data() {
        return {
            isMenuOpen: false,
            selectedOption: '',
            preguntas: [
                {
                    pregunta: "¿Qué hace diferente a CurSeek de otros buscadores de cursos?",
                    respuesta:
                        "CurSeek se destaca por su enfoque en recopilar y presentar cursos de alta calidad y bien valorados, brindando a los usuarios una selección confiable y diversa.",
                    abierta: false,
                },
                {
                    pregunta: "¿Cómo puedo buscar cursos específicos en CurSeek?",
                    respuesta:
                        "Utiliza el campo de búsqueda en la página principal para ingresar palabras clave y encontrar cursos que se adapten a tus necesidades y preferencias educativas.",
                    abierta: false,
                },
                {
                    pregunta: "¿CurSeek ofrece cursos de todas las temáticas?",
                    respuesta:
                        "Sí, CurSeek recopila cursos de diversas temáticas y niveles educativos, asegurando una amplia gama de opciones para los usuarios.",
                    abierta: false,
                },
                {
                    pregunta: "¿Cómo puedo seguir un curso en CurSeek?",
                    respuesta:
                        "Para seguir un curso, simplemente haz clic en el botón 'Seguir' en la página del curso deseado. Esto te permitirá recibir actualizaciones y notificaciones sobre ese curso.",
                    abierta: false,
                },
                {
                    pregunta: "¿Puedo marcar cursos como favoritos en CurSeek?",
                    respuesta:
                        "Sí, puedes marcar cursos como favoritos para crear una lista personalizada. Utiliza la función de 'Favoritos' para organizar y acceder fácilmente a los cursos que te interesan.",
                    abierta: false,
                },
                {
                    pregunta: "¿Cómo funciona el sistema de valoración de cursos en CurSeek?",
                    respuesta:
                        "Los cursos en CurSeek son valorados por la comunidad de usuarios. Puedes ver las valoraciones y reseñas para tomar decisiones informadas sobre los cursos que te interesan.",
                    abierta: false,
                },
                {
                    pregunta: "¿Hay cursos gratuitos en CurSeek?",
                    respuesta:
                        "Sí, CurSeek incluye una variedad de cursos gratuitos. Puedes filtrar los resultados de búsqueda para mostrar solo cursos gratuitos si lo deseas.",
                    abierta: false,
                },
                {
                    pregunta: "¿Cómo puedo acceder a los cursos en CurSeek?",
                    respuesta:
                        "CurSeek no almacena los cursos directamente. Al hacer clic en un curso, serás redirigido al sitio web o plataforma que ofrece ese curso específico para acceder a los materiales y contenido.",
                    abierta: false,
                },
                {
                    pregunta: "¿CurSeek ofrece recursos para aprender en diferentes idiomas?",
                    respuesta:
                        "Sí, CurSeek busca cursos en varios idiomas para satisfacer las necesidades de usuarios de todo el mundo. Puedes ajustar tus preferencias de idioma en la configuración.",
                    abierta: false,
                },
                {
                    pregunta: "¿Cómo puedo contactar al soporte de CurSeek si tengo problemas?",
                    respuesta:
                        "Si encuentras problemas o tienes preguntas, puedes ponerte en contacto con nuestro equipo de soporte a través del formulario de contacto en la sección 'Soporte'. Estamos aquí para ayudarte.",
                    abierta: false,
                },
            ],
        };
    },
    methods: {
        togglePregunta(index) {
            this.preguntas[index].abierta = !this.preguntas[index].abierta;
        },
        togglePregunta(index) {
            this.preguntas[index].abierta = !this.preguntas[index].abierta;
        },
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
        selectOption(option) {
            this.selectedOption = option;
            // Cierra el menú al seleccionar una opción
            this.isMenuOpen = false;
        },
        closeMenu(event) {
            if (!this.$el.contains(event.target)) {
                this.isMenuOpen = false;
            }
        },
    },
    mounted() {
        document.addEventListener('click', this.closeMenu);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.closeMenu);
    },
}
</script>