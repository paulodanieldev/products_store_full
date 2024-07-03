--
-- PostgreSQL database dump
--

-- Dumped from database version 13.15 (Debian 13.15-1.pgdg120+1)
-- Dumped by pg_dump version 13.15 (Debian 13.15-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: tb_product_types; Type: TABLE; Schema: public; Owner: softexpert
--

CREATE TABLE public.tb_product_types (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.tb_product_types OWNER TO softexpert;

--
-- Name: tb_product_types_id_seq; Type: SEQUENCE; Schema: public; Owner: softexpert
--

CREATE SEQUENCE public.tb_product_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tb_product_types_id_seq OWNER TO softexpert;

--
-- Name: tb_product_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: softexpert
--

ALTER SEQUENCE public.tb_product_types_id_seq OWNED BY public.tb_product_types.id;


--
-- Name: tb_products; Type: TABLE; Schema: public; Owner: softexpert
--

CREATE TABLE public.tb_products (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    price numeric(10,2) NOT NULL,
    product_type_id integer NOT NULL
);


ALTER TABLE public.tb_products OWNER TO softexpert;

--
-- Name: tb_products_id_seq; Type: SEQUENCE; Schema: public; Owner: softexpert
--

CREATE SEQUENCE public.tb_products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tb_products_id_seq OWNER TO softexpert;

--
-- Name: tb_products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: softexpert
--

ALTER SEQUENCE public.tb_products_id_seq OWNED BY public.tb_products.id;


--
-- Name: tb_sale_items; Type: TABLE; Schema: public; Owner: softexpert
--

CREATE TABLE public.tb_sale_items (
    id integer NOT NULL,
    sale_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    price numeric(10,2) NOT NULL,
    tax numeric(10,2) NOT NULL
);


ALTER TABLE public.tb_sale_items OWNER TO softexpert;

--
-- Name: tb_sale_items_id_seq; Type: SEQUENCE; Schema: public; Owner: softexpert
--

CREATE SEQUENCE public.tb_sale_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tb_sale_items_id_seq OWNER TO softexpert;

--
-- Name: tb_sale_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: softexpert
--

ALTER SEQUENCE public.tb_sale_items_id_seq OWNED BY public.tb_sale_items.id;


--
-- Name: tb_sales; Type: TABLE; Schema: public; Owner: softexpert
--

CREATE TABLE public.tb_sales (
    id integer NOT NULL,
    sale_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    total numeric(10,2) NOT NULL,
    total_tax numeric(10,2) NOT NULL
);


ALTER TABLE public.tb_sales OWNER TO softexpert;

--
-- Name: tb_sales_id_seq; Type: SEQUENCE; Schema: public; Owner: softexpert
--

CREATE SEQUENCE public.tb_sales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tb_sales_id_seq OWNER TO softexpert;

--
-- Name: tb_sales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: softexpert
--

ALTER SEQUENCE public.tb_sales_id_seq OWNED BY public.tb_sales.id;


--
-- Name: tb_taxes; Type: TABLE; Schema: public; Owner: softexpert
--

CREATE TABLE public.tb_taxes (
    id integer NOT NULL,
    product_type_id integer NOT NULL,
    tax_rate numeric(5,2) NOT NULL
);


ALTER TABLE public.tb_taxes OWNER TO softexpert;

--
-- Name: tb_taxes_id_seq; Type: SEQUENCE; Schema: public; Owner: softexpert
--

CREATE SEQUENCE public.tb_taxes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tb_taxes_id_seq OWNER TO softexpert;

--
-- Name: tb_taxes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: softexpert
--

ALTER SEQUENCE public.tb_taxes_id_seq OWNED BY public.tb_taxes.id;


--
-- Name: tb_product_types id; Type: DEFAULT; Schema: public; Owner: softexpert
--

ALTER TABLE ONLY public.tb_product_types ALTER COLUMN id SET DEFAULT nextval('public.tb_product_types_id_seq'::regclass);


--
-- Name: tb_products id; Type: DEFAULT; Schema: public; Owner: softexpert
--

ALTER TABLE ONLY public.tb_products ALTER COLUMN id SET DEFAULT nextval('public.tb_products_id_seq'::regclass);


--
-- Name: tb_sale_items id; Type: DEFAULT; Schema: public; Owner: softexpert
--

ALTER TABLE ONLY public.tb_sale_items ALTER COLUMN id SET DEFAULT nextval('public.tb_sale_items_id_seq'::regclass);


--
-- Name: tb_sales id; Type: DEFAULT; Schema: public; Owner: softexpert
--

ALTER TABLE ONLY public.tb_sales ALTER COLUMN id SET DEFAULT nextval('public.tb_sales_id_seq'::regclass);


--
-- Name: tb_taxes id; Type: DEFAULT; Schema: public; Owner: softexpert
--

ALTER TABLE ONLY public.tb_taxes ALTER COLUMN id SET DEFAULT nextval('public.tb_taxes_id_seq'::regclass);


--
-- Data for Name: tb_product_types; Type: TABLE DATA; Schema: public; Owner: softexpert
--

COPY public.tb_product_types (id, name) FROM stdin;
6	Roupas
2	Games
1	Livros
5	Sapatos
\.


--
-- Data for Name: tb_products; Type: TABLE DATA; Schema: public; Owner: softexpert
--

COPY public.tb_products (id, name, price, product_type_id) FROM stdin;
3	camisa polo P	150.55	6
5	camisa feminina P	432.59	6
6	Harry potter 1	12.05	1
8	Senhor dos Aneis	4.59	1
9	GTA 5	55.75	2
11	Resident evil 4	4.80	2
\.


--
-- Data for Name: tb_sale_items; Type: TABLE DATA; Schema: public; Owner: softexpert
--

COPY public.tb_sale_items (id, sale_id, product_id, quantity, price, tax) FROM stdin;
37	15	3	2	150.55	36.85
38	15	6	2	12.05	1.11
39	15	9	3	55.75	5.00
40	16	9	1	55.75	1.67
41	16	11	1	4.80	0.14
\.


--
-- Data for Name: tb_sales; Type: TABLE DATA; Schema: public; Owner: softexpert
--

COPY public.tb_sales (id, sale_date, total, total_tax) FROM stdin;
15	2024-07-03 17:58:31	535.41	42.96
16	2024-07-03 17:58:54	62.36	1.81
\.


--
-- Data for Name: tb_taxes; Type: TABLE DATA; Schema: public; Owner: softexpert
--

COPY public.tb_taxes (id, product_type_id, tax_rate) FROM stdin;
5	6	12.24
2	2	2.99
1	1	4.60
\.


--
-- Name: tb_product_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: softexpert
--

SELECT pg_catalog.setval('public.tb_product_types_id_seq', 12, true);


--
-- Name: tb_products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: softexpert
--

SELECT pg_catalog.setval('public.tb_products_id_seq', 13, true);


--
-- Name: tb_sale_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: softexpert
--

SELECT pg_catalog.setval('public.tb_sale_items_id_seq', 41, true);


--
-- Name: tb_sales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: softexpert
--

SELECT pg_catalog.setval('public.tb_sales_id_seq', 16, true);


--
-- Name: tb_taxes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: softexpert
--

SELECT pg_catalog.setval('public.tb_taxes_id_seq', 6, true);


--
-- Name: tb_product_types tb_product_types_pkey; Type: CONSTRAINT; Schema: public; Owner: softexpert
--

ALTER TABLE ONLY public.tb_product_types
    ADD CONSTRAINT tb_product_types_pkey PRIMARY KEY (id);


--
-- Name: tb_products tb_products_pkey; Type: CONSTRAINT; Schema: public; Owner: softexpert
--

ALTER TABLE ONLY public.tb_products
    ADD CONSTRAINT tb_products_pkey PRIMARY KEY (id);


--
-- Name: tb_sale_items tb_sale_items_pkey; Type: CONSTRAINT; Schema: public; Owner: softexpert
--

ALTER TABLE ONLY public.tb_sale_items
    ADD CONSTRAINT tb_sale_items_pkey PRIMARY KEY (id);


--
-- Name: tb_sales tb_sales_pkey; Type: CONSTRAINT; Schema: public; Owner: softexpert
--

ALTER TABLE ONLY public.tb_sales
    ADD CONSTRAINT tb_sales_pkey PRIMARY KEY (id);


--
-- Name: tb_taxes tb_taxes_pkey; Type: CONSTRAINT; Schema: public; Owner: softexpert
--

ALTER TABLE ONLY public.tb_taxes
    ADD CONSTRAINT tb_taxes_pkey PRIMARY KEY (id);


--
-- Name: tb_products tb_products_product_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: softexpert
--

ALTER TABLE ONLY public.tb_products
    ADD CONSTRAINT tb_products_product_type_id_fkey FOREIGN KEY (product_type_id) REFERENCES public.tb_product_types(id);


--
-- Name: tb_sale_items tb_sale_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: softexpert
--

ALTER TABLE ONLY public.tb_sale_items
    ADD CONSTRAINT tb_sale_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.tb_products(id);


--
-- Name: tb_sale_items tb_sale_items_sale_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: softexpert
--

ALTER TABLE ONLY public.tb_sale_items
    ADD CONSTRAINT tb_sale_items_sale_id_fkey FOREIGN KEY (sale_id) REFERENCES public.tb_sales(id);


--
-- Name: tb_taxes tb_taxes_product_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: softexpert
--

ALTER TABLE ONLY public.tb_taxes
    ADD CONSTRAINT tb_taxes_product_type_id_fkey FOREIGN KEY (product_type_id) REFERENCES public.tb_product_types(id);


--
-- PostgreSQL database dump complete
--

