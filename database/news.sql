PGDMP         "    
            y            news_app    13.1    13.1 )    ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    65946    news_app    DATABASE     k   CREATE DATABASE news_app WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Indonesian_Indonesia.1252';
    DROP DATABASE news_app;
                postgres    false            ?           1247    65948    type_level_user    TYPE     I   CREATE TYPE public.type_level_user AS ENUM (
    'admin',
    'basic'
);
 "   DROP TYPE public.type_level_user;
       public          postgres    false            ?            1259    65975 
   categories    TABLE     ?   CREATE TABLE public.categories (
    id integer NOT NULL,
    name_categories character varying(255) NOT NULL,
    cover character varying(255)
);
    DROP TABLE public.categories;
       public         heap    postgres    false            ?            1259    66039    categories_id_seq    SEQUENCE     ?   ALTER TABLE public.categories ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);
            public          postgres    false    202            ?            1259    65965    news    TABLE     /  CREATE TABLE public.news (
    id integer NOT NULL,
    id_user integer NOT NULL,
    title character varying(255) NOT NULL,
    tags character varying(255) NOT NULL,
    created_at date NOT NULL,
    text_news text NOT NULL,
    poster character varying(100) NOT NULL,
    category integer NOT NULL
);
    DROP TABLE public.news;
       public         heap    postgres    false            ?            1259    65987    news_comments    TABLE     ?   CREATE TABLE public.news_comments (
    id integer NOT NULL,
    id_news integer NOT NULL,
    id_user integer NOT NULL,
    created_at date NOT NULL,
    comment text NOT NULL
);
 !   DROP TABLE public.news_comments;
       public         heap    postgres    false            ?            1259    66049    news_comments_id_seq    SEQUENCE     ?   ALTER TABLE public.news_comments ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.news_comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);
            public          postgres    false    203            ?            1259    66037    news_id_seq    SEQUENCE     ?   ALTER TABLE public.news ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.news_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);
            public          postgres    false    201            ?            1259    66543 
   news_likes    TABLE     ?   CREATE TABLE public.news_likes (
    id integer NOT NULL,
    id_news integer NOT NULL,
    id_user integer NOT NULL,
    status boolean NOT NULL
);
    DROP TABLE public.news_likes;
       public         heap    postgres    false            ?            1259    65992 
   user_saved    TABLE     ?   CREATE TABLE public.user_saved (
    id integer NOT NULL,
    id_news integer NOT NULL,
    id_user integer NOT NULL,
    created_at date NOT NULL
);
    DROP TABLE public.user_saved;
       public         heap    postgres    false            ?            1259    65953    users    TABLE     ?  CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    phone character varying(255) NOT NULL,
    role public.type_level_user NOT NULL,
    avatar character varying(100),
    username character varying(50),
    name character varying(100),
    bio character varying(50),
    job character varying(50),
    bg_profile character varying(100)
);
    DROP TABLE public.users;
       public         heap    postgres    false    649            ?            1259    66032    users_id_seq    SEQUENCE     ?   ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);
            public          postgres    false    200            ?          0    65975 
   categories 
   TABLE DATA           @   COPY public.categories (id, name_categories, cover) FROM stdin;
    public          postgres    false    202   21       ?          0    65965    news 
   TABLE DATA           a   COPY public.news (id, id_user, title, tags, created_at, text_news, poster, category) FROM stdin;
    public          postgres    false    201   h1       ?          0    65987    news_comments 
   TABLE DATA           R   COPY public.news_comments (id, id_news, id_user, created_at, comment) FROM stdin;
    public          postgres    false    203   3       ?          0    66543 
   news_likes 
   TABLE DATA           B   COPY public.news_likes (id, id_news, id_user, status) FROM stdin;
    public          postgres    false    209   T3       ?          0    65992 
   user_saved 
   TABLE DATA           F   COPY public.user_saved (id, id_news, id_user, created_at) FROM stdin;
    public          postgres    false    204   q3       ?          0    65953    users 
   TABLE DATA           o   COPY public.users (id, email, password, phone, role, avatar, username, name, bio, job, bg_profile) FROM stdin;
    public          postgres    false    200   ?3       ?           0    0    categories_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.categories_id_seq', 2, true);
          public          postgres    false    207            ?           0    0    news_comments_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.news_comments_id_seq', 3, true);
          public          postgres    false    208            ?           0    0    news_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.news_id_seq', 13, true);
          public          postgres    false    206            ?           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 14, true);
          public          postgres    false    205            N           2606    65981 ,   categories categories_name_categories_unique 
   CONSTRAINT     r   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_categories_unique UNIQUE (name_categories);
 V   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_name_categories_unique;
       public            postgres    false    202            P           2606    65979    categories categories_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public            postgres    false    202            R           2606    65991     news_comments news_comments_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.news_comments
    ADD CONSTRAINT news_comments_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.news_comments DROP CONSTRAINT news_comments_pkey;
       public            postgres    false    203            V           2606    66547    news_likes news_likes_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.news_likes
    ADD CONSTRAINT news_likes_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.news_likes DROP CONSTRAINT news_likes_pkey;
       public            postgres    false    209            J           2606    65972    news news_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.news
    ADD CONSTRAINT news_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.news DROP CONSTRAINT news_pkey;
       public            postgres    false    201            L           2606    65974    news news_title_unique 
   CONSTRAINT     R   ALTER TABLE ONLY public.news
    ADD CONSTRAINT news_title_unique UNIQUE (title);
 @   ALTER TABLE ONLY public.news DROP CONSTRAINT news_title_unique;
       public            postgres    false    201            T           2606    65996    user_saved user_saved_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.user_saved
    ADD CONSTRAINT user_saved_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.user_saved DROP CONSTRAINT user_saved_pkey;
       public            postgres    false    204            D           2606    65962    users users_email_unique 
   CONSTRAINT     T   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_unique;
       public            postgres    false    200            F           2606    65964    users users_phone_unique 
   CONSTRAINT     T   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_phone_unique UNIQUE (phone);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_phone_unique;
       public            postgres    false    200            H           2606    65960    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    200            X           2606    66041    news news_category_foreign    FK CONSTRAINT     ?   ALTER TABLE ONLY public.news
    ADD CONSTRAINT news_category_foreign FOREIGN KEY (category) REFERENCES public.categories(id) ON UPDATE SET NULL ON DELETE SET NULL;
 D   ALTER TABLE ONLY public.news DROP CONSTRAINT news_category_foreign;
       public          postgres    false    201    202    2896            Y           2606    66002 +   news_comments news_comments_id_news_foreign    FK CONSTRAINT     ?   ALTER TABLE ONLY public.news_comments
    ADD CONSTRAINT news_comments_id_news_foreign FOREIGN KEY (id_news) REFERENCES public.news(id);
 U   ALTER TABLE ONLY public.news_comments DROP CONSTRAINT news_comments_id_news_foreign;
       public          postgres    false    201    203    2890            Z           2606    66012 +   news_comments news_comments_id_user_foreign    FK CONSTRAINT     ?   ALTER TABLE ONLY public.news_comments
    ADD CONSTRAINT news_comments_id_user_foreign FOREIGN KEY (id_user) REFERENCES public.users(id);
 U   ALTER TABLE ONLY public.news_comments DROP CONSTRAINT news_comments_id_user_foreign;
       public          postgres    false    2888    200    203            W           2606    66017    news news_id_user_foreign    FK CONSTRAINT     x   ALTER TABLE ONLY public.news
    ADD CONSTRAINT news_id_user_foreign FOREIGN KEY (id_user) REFERENCES public.users(id);
 C   ALTER TABLE ONLY public.news DROP CONSTRAINT news_id_user_foreign;
       public          postgres    false    201    2888    200            [           2606    66007 %   user_saved user_saved_id_news_foreign    FK CONSTRAINT     ?   ALTER TABLE ONLY public.user_saved
    ADD CONSTRAINT user_saved_id_news_foreign FOREIGN KEY (id_news) REFERENCES public.news(id);
 O   ALTER TABLE ONLY public.user_saved DROP CONSTRAINT user_saved_id_news_foreign;
       public          postgres    false    2890    204    201            \           2606    66022 %   user_saved user_saved_id_user_foreign    FK CONSTRAINT     ?   ALTER TABLE ONLY public.user_saved
    ADD CONSTRAINT user_saved_id_user_foreign FOREIGN KEY (id_user) REFERENCES public.users(id);
 O   ALTER TABLE ONLY public.user_saved DROP CONSTRAINT user_saved_id_user_foreign;
       public          postgres    false    204    200    2888            ?   &   x?3?,???,??????2?L?/K-?M?+qc???? ?d	k      ?   ?  x???͎?@?s?? 2K@7Wc??D??x0?R3?2=݄n??????8?e/@????;)?8}?\??????C??^??e?[=f&*?˪.?`l???Cg?';??%????O?v??aIxD?0???	?+??!?G??s?-??K7SL??7??7?K??(q?wS?/j&?{;XL??g??B3?;???F!؝;???~??e&;?̤?w?.8j???2.??p??(im??<=Zv?i?:?a??????j#??R?Km????W	???_ry??Uu??U??5??[?p????7۔??p?\??V??U)M?+?~????u?n?E{=cv???#_???:<k?@?9??8 =??B"?ʐ????Hi~???<F+#???K?|???h????	??0?>????t?wEQ|?.u      ?   *   x?3?4?4?4202?50?54???O?P????2?)???? I??      ?      x?????? ? ?      ?      x?????? ? ?      ?   ?  x?u?I??8 ?3?+|??[Bb?/x7^0`W??d? v26?>t:?L????E????9??߂??u??yN??M???8?8??^?oӉ?x???o?4q??"J?@9XTa?f?Qy?@^]? 2'\??E?c???׸??$??IH ???:?)?M??2?4a?̎Ƹw??neY??? g?}э??M????:/????[???$?/ ????ͤ??ȂȐ򊳈f?xD??3?6fa??n??t	???h???L?ܞ??*?ٸ?y{|?-?(ʯ@???z^?'??W???V?%@?Ϟ??8?w?v???V???4??i???p??i?w3L??`xEUxQE?(?Ou?s??bV?9Y?X?՛zL⦡BXqy*???!0?????l??p04U??,?????
???g???V??0?6e????^?????V1?~??m?9]?]?@?(????x8#~?U?͈8?f??U?S??c?34??S?k????`??ٲ?k?>??0 ?z
s?%i????i?yX??&Z?΢jk?Ϙ[h?\?/P??H??Z?jJ??a;QV(?SRe??{tW?ܚe?yS?B?ζ>?"#????[?"?& ⼫???n?a"R?w?????S?{Y58{p_,Z9????q·r??&G??e](?]g΍K??V{ܜ5nt?\?C?~veQBP?o' \?v??̚??9Ǖ??0?L
??R?1?B??6???Qj??m??N???sZ?C??4)?!7y]f%???????'Td?h?!??H???|-?,b[????.ez$???|t?P?f:4??V?^M??|cǧCs?O?-M??m?Q?????V??m????OF~ Jp4??Fc#!?	I:?#??vy\?9j??9?o=X?6n?L?v?g?????i?Q5UQ?!?????ŏb?e????????L{+??z?<!?3:M???nܳ???b?ͯ??7??~y%?o~???????? ?     