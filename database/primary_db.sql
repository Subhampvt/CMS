--
-- PostgreSQL database dump
--

\restrict seTdHBUXExjv3Opws7w8zPv1eYCukeJkvqyoCjT1EzVkAYt6P2ehFCog4jYbraH

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-03-05 23:11:21

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 219 (class 1259 OID 16390)
-- Name: employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employees (
    tr_id character varying NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    dept character varying NOT NULL
);


ALTER TABLE public.employees OWNER TO postgres;

--
-- TOC entry 5006 (class 0 OID 16390)
-- Dependencies: 219
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employees (tr_id, name, email, dept) FROM stdin;
ISTRAC000	Admin User	admin@istrac.gov.in	dept1
ISTRAC001	Chief Approver	chief@istrac.gov.in	dept1
ISTRAC002	Reviewer One	cmb1@istrac.gov.in	dept1
ISTRAC003	Standard Submitter	user1@istrac.gov.in	dept1
\.


--
-- TOC entry 4856 (class 2606 OID 16400)
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (tr_id);


--
-- TOC entry 4857 (class 1259 OID 16402)
-- Name: ix_employees_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ix_employees_email ON public.employees USING btree (email);


--
-- TOC entry 4858 (class 1259 OID 16401)
-- Name: ix_employees_tr_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_employees_tr_id ON public.employees USING btree (tr_id);


-- Completed on 2026-03-05 23:11:21

--
-- PostgreSQL database dump complete
--

\unrestrict seTdHBUXExjv3Opws7w8zPv1eYCukeJkvqyoCjT1EzVkAYt6P2ehFCog4jYbraH

