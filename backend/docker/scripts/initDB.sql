CREATE TABLE `avales` (
  `id_avalado` int(11) NOT NULL,
  `id_avalador` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `avales`
--

INSERT INTO `avales` (`id_avalado`, `id_avalador`) VALUES
(8, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `dni` varchar(9) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `telefono` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `dni`, `nombre`, `apellidos`, `telefono`) VALUES
(1, '74894897C', 'Ruben', 'Arcos', 123456789),
(8, '12345678', 'Maria Auxiliadora', 'Ortiz', 123456789);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `coches`
--

CREATE TABLE `coches` (
  `id` int(11) NOT NULL,
  `matricula` varchar(7) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `modelo` varchar(50) NOT NULL,
  `color` varchar(20) NOT NULL,
  `garaje` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `coches`
--

INSERT INTO `coches` (`id`, `matricula`, `marca`, `modelo`, `color`, `garaje`) VALUES
(1, '1111ABC', 'Ford', 'Fiesta', 'Negro', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva`
--

CREATE TABLE `reserva` (
  `id` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `reserva`
--

INSERT INTO `reserva` (`id`, `id_cliente`, `fecha`, `total`) VALUES
(1, 8, '2021-01-05', 100);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservadetalle`
--

CREATE TABLE `reservadetalle` (
  `id_reserva` int(11) NOT NULL,
  `id_coche` int(11) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `gasolina` int(11) NOT NULL COMMENT 'litros (a fecha_inicio)',
  `entregado` tinyint(1) NOT NULL COMMENT 'a fecha_fin'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `reservadetalle`
--

INSERT INTO `reservadetalle` (`id_reserva`, `id_coche`, `fecha_inicio`, `fecha_fin`, `precio`, `gasolina`, `entregado`) VALUES
(1, 1, '2021-01-05', '2021-01-05', '100', 10, 0),
(1, 1, '2021-01-05', '2021-01-05', '100', 10, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user` varchar(10) NOT NULL,
  `password` varchar(10) NOT NULL,
  `id` int(11) NOT NULL,
  `type` enum('admin','normal') NOT NULL DEFAULT 'normal'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user`, `password`, `id`, `type`) VALUES
('admin', 'admin', 1, 'admin'),
('ruben', 'ruben', 1, 'normal'),
('maria', 'maria', 8, 'normal');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `avales`
--
ALTER TABLE `avales`
  ADD PRIMARY KEY (`id_avalado`,`id_avalador`),
  ADD KEY `id_avalador.avales-id.clientes` (`id_avalador`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dni` (`dni`);

--
-- Indices de la tabla `coches`
--
ALTER TABLE `coches`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `matricula` (`matricula`);

--
-- Indices de la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD PRIMARY KEY (`id`,`id_cliente`,`fecha`),
  ADD KEY `fecha` (`fecha`),
  ADD KEY `id_coche_2` (`id_cliente`),
  ADD KEY `id_cliente` (`id`);

--
-- Indices de la tabla `reservadetalle`
--
ALTER TABLE `reservadetalle`
  ADD KEY `id_reserva.reservadetalle-id.reserva` (`id_reserva`),
  ADD KEY `id_coche.reservadetalle-id.coche` (`id_coche`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `coches`
--
ALTER TABLE `coches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `reserva`
--
ALTER TABLE `reserva`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `avales`
--
ALTER TABLE `avales`
  ADD CONSTRAINT `id_avalado.avales-id.clientes` FOREIGN KEY (`id_avalado`) REFERENCES `clientes` (`id`),
  ADD CONSTRAINT `id_avalador.avales-id.clientes` FOREIGN KEY (`id_avalador`) REFERENCES `clientes` (`id`);

--
-- Filtros para la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD CONSTRAINT `id_cliente.reserva-id.cliente` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `reservadetalle`
--
ALTER TABLE `reservadetalle`
  ADD CONSTRAINT `id_coche.reservadetalle-id.coche` FOREIGN KEY (`id_coche`) REFERENCES `coches` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `id_reserva.reservadetalle-id.reserva` FOREIGN KEY (`id_reserva`) REFERENCES `reserva` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id`) REFERENCES `clientes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
