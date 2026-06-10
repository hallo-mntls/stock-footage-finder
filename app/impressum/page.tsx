import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Impressum",
  description: `Impressum von ${SITE_NAME}`,
  robots: { index: false, follow: true },
};

export default function ImpressumPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-gray-300">
      <h1 className="text-3xl font-bold text-white mb-8">Impressum</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">Angaben gemäß § 5 DDG</h2>
        <p>
          Tim-Maurice Röber<br />
          Quellenweg 13<br />
          86853 Langerringen<br />
          Deutschland
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">Kontakt</h2>
        <p>
          Telefon: 01745148254<br />
          E-Mail: noreply@morenotless.de
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p>
          Tim-Maurice Röber<br />
          Quellenweg 13<br />
          86853 Langerringen
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">EU-Streitschlichtung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-400 hover:underline"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
          .<br />
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">Haftung für Inhalte</h2>
        <p className="mb-3">
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten
          nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als
          Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
          Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
          Tätigkeit hinweisen.
        </p>
        <p>
          {SITE_NAME} ist eine Suchmaschine für frei verfügbares Videomaterial. Die durchsuchbaren
          Videos, Vorschaubilder und Inhalte stammen von Drittanbietern wie Pexels, Pixabay,
          YouTube, Coverr und Archive.org und unterliegen deren jeweiligen Lizenzbedingungen und
          Nutzungsrechten. Für die Inhalte dieser externen Quellen sind ausschließlich deren
          Betreiber verantwortlich.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">Haftung für Links</h2>
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
          Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
          übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder
          Betreiber der Seiten verantwortlich. Eine permanente inhaltliche Kontrolle der
          verlinkten Seiten ist ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar.
          Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
        </p>
      </section>
    </div>
  );
}
