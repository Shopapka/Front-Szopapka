import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, ChangeEvent, Key } from "react";
import "./faq.css";
import { animate, motion, useInView } from "motion/react";
import { inView, stagger } from "motion";
import FaqItem from "./faq_item";

const Faq = () => {

    const titles =['Po co mi ta strona?', 'Jak dołączyć do rodziny?', 'Jak dodać rodzinę?',
         'Jak dodać zakup do listy zakupów?', 'Jak działa lista zakupowa?', 'Jak się wylogować?',
        'Jak to było zrobić SzopAppkę, dobrze?'];

   
    let poCoStrona:any = <p className="faq_item_tekst">
        Stworzyliśmy SzopApkę po to, by uprościć twoje rodzinne zakupy! 😉 Dzięki nam możesz dołączyć do rodziny,
         dodać do niej członków, a następnie zacząć organizowanie zakupów! Wszyscy członkowie danej rodziny widzą co jest 
         potrzebne do kupienia! Każdy może się zadeklarować jaką rzecz z listy kupi, zaznaczyć że już ją kupił oraz dodawać 
         kolejne potrzebne produkty na listę. Dzięki nam zakupy będzie szybkie, wydajne i zorganizowane! 😎
    </p>;

    let jakDoloczycDoRodziny:any = <p className="faq_item_tekst">
        Aby dołączć do rodziny przejdź <Link to="/dashboard">tutaj</Link>. Następnie w polu formularza proszącym o kod 
        wpisz kod dołączania do rodziny. Kod ten możesz otrzymać od osób, które są już w rodzine, dlatego należy się z nimi
         skontaktować. Gdy kod będzie już wpisany wciśnij przycisk "Dołącz do rodziny". I gotowe! 😎
    </p>;

    let jakStworzycRodzine:any = <p className="faq_item_tekst">
        Aby stworzyć rodzinę przejdź <Link to="/dashboard">tutaj</Link>. Następnie na samej górze strony odszukaj 
        formularz. Obok tego fomularza znajduje się instrukcja dodawania nowej rodziny. Podążaj za tą instrukcją, a
        na penwo uda ci się stworzyć rodzinę!
    </p>;

    let jakDodacZakup:any = <p className="faq_item_tekst">
        Aby dodać zakup jako pierwsze przejdź <Link to="/dashboard">tutaj</Link>. Następnie na tej stronie w liście rodzin 
        odszkuaj tą, w której chcesz dodać coś do listy zakupów. Przejdź do panelu rodziny klikając przycisk 
        "Przejdź do listy zakupów". Następnie na tej stronie odszukaj formularz dodawania produktu do listy zakupów.
        Uzupełnij nazwę oraz ilość potrzebnego produktu. Następnie kliknij przycisk "Dodaj zakup". Zakup zostanie dodany do
        twojej listy! 
    </p>;

    let jakDzialaLista:any = <p className="faq_item_tekst">
        Nasza lista zakupów pozwala Tobie i Twojej rodzinie prosto zorganizować zakupy domowe. Po wejściu w daną 
        rodzinę widzisz waszą listę zakupów. Wszystkie dodane produkty są widziane przez wszystkie osoby wewnątrz rodziny. Dzięki temu
        można podzielić się obowiązkiem zakupów. 
        <br/> <br/>
        Jeżeli chcesz przekazać innym członkom rodziny, że dany produkt zostanie kupiony przez ciebie możesz kliknąć przycisk "Ja to kupię".
        Sprawi to że pozostali użytkownicy zobaczą że ten produkt jest kupowany przez Ciebie. Takie działanie pozwala Twojej rodzinie uniknięcia
        kilkukrotnego kupowania tego samego produktu. 
        <br/><br/>
        Jeżeli dany produkt jest przypisany do danego członka rodziny zauważysz to po prawej stronie produktu. Wyświetli się wtedy tekst: Produkt kupowany przez: Członek Twojej Rodziny.
        <br/><br/>
        Jeżeli kupiłes już dany produkt możesz przekazać to innym użytkownikom. Jako pierwsze należy przypisać siebie do
        kupowania danego produktu. Następnie gdy produkt jest już kupiony możesz kliknąć przycisk "Kupione". Inni użytkownicy
        dostaną informację że ten produkt jest już kupiony.
        <br/><br/>
        Usuwanie produktu. Jeżeli produkt jest juz kupiony i nie potrzebujesz by wyświetlał się na liście możesz kliknąć przycisk "Usuń".
    </p>;

    let jakWylogowac:any = <p className="faq_item_tekst">
        Aby się wylogować przejdź <Link to="/account">tutaj</Link>. Następnie na tej stronie odszukaj przycisk
        wyloguj. Kliknięcie tego przycisku sprawi że zostaniesz wylogowany.
    </p>;

     let jakTamDobrze:any = <p className="faq_item_tekst">
        A wiesz co? Naszym zdaniem to nie ma tak, że dobrze, albo że nie dobrze. <br/>
        Gdybyśmy mieli owiedzieć co najbardziej cenimy w życiu najbardziej, powiedzielibyśmy, że ludzi. <br/>
        Ludzi, którzy podali nam pomoca dłoń, kiedy zaczynaliśmy pisać tą stronę, kiedy byliśmy sami. <br/>
        I co ciekawe, to właśnie przypadkowe spotkania wpływają na nasze życie. <br/>
        Chodzi o to, że kiedy wyznaje się pewne wartości, nawet pozornie uniwersalne,
        bywa, że nie znajduje się zrozumienia, które by tak rzec, które pomaga się nam rozwijać. <br/>
        My mieliśmy to szczęście, by tak rzec, ponieważ je znalaźliśmy, i dziękujemy życiu! <br/>
        Dziękujemy mu; życie to śpiew, życie to taniec, życie to miłość! <br/>
        Wielu ludzi pyta nas o to samo: ale jak wy to robicie, skąd czerpiecie tę radość? A my odpowiadamy, że to proste! <br/>
        To umiłowanie życia. To właśnie ono sprawia, że dzisiaj na przykład budujemy stronę SzopApka, a jutro... kto wie? Dlaczego by nie, oddamy się pracy w innej technologii i będziemy, ot, 
        choćby, robić w... Wordpressie...

    </p>;
    
    
    const contens = [poCoStrona, jakDoloczycDoRodziny, jakStworzycRodzine, jakDodacZakup, jakDzialaLista, jakWylogowac, jakTamDobrze];

    return(
        <div className="faq_main">
            <h2 className="faq_titile">Najczęściej zadawane pytania</h2>
            <p className="faq_explenations">Poniżej prawdopodobnie znajduje się odpowiedź na każde Twoje pytanie odnośnie naszej strony! Jeżeli jednak, dalej masz wątpliwości napisz do nas na bardzopowaznymail@szop.apka.com. Na pewno odpowiemy! 🫡</p>

            <div className="faq_items">
                {contens.map((cont, index) =>
                <FaqItem title={titles[index]} content={cont} delay={index} additionalClass={"border_grey"}/>)}
            </div>

        </div>
    );
}

export default Faq;