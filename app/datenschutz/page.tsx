import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: `Datenschutzerklärung von ${SITE_NAME}`,
  robots: { index: false, follow: true },
};

export default function DatenschutzPage() {
  return (
    <div lang="de" className="max-w-3xl mx-auto px-4 py-12 text-gray-300">
      <h1 className="text-3xl font-bold text-white mb-8">Datenschutzerklärung</h1>

      <p className="mb-8 text-sm text-gray-500">
        Diese Datenschutzerklärung dient als allgemeine Information über die Verarbeitung
        personenbezogener Daten bei der Nutzung dieser Website. Sie ersetzt keine individuelle
        Rechtsberatung.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">1. Verantwortlicher</h2>
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br />
          Tim-Maurice Röber<br />
          Quellenweg 13<br />
          86853 Langerringen<br />
          Deutschland<br />
          E-Mail: noreply@morenotless.de
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">2. Hosting</h2>
        <p>
          Diese Website wird bei Vercel Inc. (340 S Lemon Ave #4133, Walnut, CA 91789, USA)
          gehostet. Beim Aufruf der Website verarbeitet Vercel automatisch technische Daten
          (z. B. IP-Adresse, Datum und Uhrzeit der Anfrage, übertragene Datenmenge), um die
          Auslieferung der Website zu ermöglichen und die Stabilität und Sicherheit zu
          gewährleisten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
          an einer sicheren und funktionsfähigen Bereitstellung der Website).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">3. Cookies und Einwilligung</h2>
        <p className="mb-3">
          Diese Website verwendet einen Cookie-Consent-Banner, mit dem du entscheiden kannst, ob
          du der Nutzung von Cookies und vergleichbaren Technologien für Statistik- und
          Marketingzwecke zustimmst. Technisch notwendige Cookies (z. B. zur Speicherung deiner
          Cookie-Einstellung oder deiner Merkliste) werden unabhängig von deiner Einwilligung
          gesetzt, da sie für den Betrieb der Website erforderlich sind (Rechtsgrundlage: Art. 6
          Abs. 1 lit. f DSGVO).
        </p>
        <p>
          Die unten beschriebenen Dienste Google Analytics, Impact.com und Google AdSense werden
          erst geladen, wenn du im Banner „Alle akzeptieren“ ausgewählt hast. Deine Einwilligung
          wird in deinem Browser gespeichert (Local Storage) und kann jederzeit durch Löschen
          deiner Browserdaten widerrufen werden.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">4. Server-Logfiles</h2>
        <p>
          Bei jedem Aufruf dieser Website können automatisch Informationen in sogenannten
          Server-Logfiles gespeichert werden, die dein Browser übermittelt (z. B. Browsertyp,
          Betriebssystem, Referrer-URL, Hostname, Uhrzeit der Anfrage, IP-Adresse). Diese Daten
          dienen ausschließlich der technischen Bereitstellung und Sicherheit und werden nicht
          mit anderen Datenquellen zusammengeführt.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">5. Google Analytics</h2>
        <p>
          Sofern du eingewilligt hast, nutzen wir Google Analytics, einen Webanalysedienst der
          Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Irland). Google
          Analytics verwendet Cookies, die eine Analyse der Benutzung der Website ermöglichen
          (z. B. aufgerufene Seiten, Verweildauer, Herkunft der Besucher). Die hierbei erzeugten
          Informationen werden in der Regel an einen Server von Google übertragen und dort
          gespeichert. Rechtsgrundlage ist deine Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO.
          Du kannst deine Einwilligung jederzeit widerrufen, indem du die Cookie-Einstellungen
          über das Löschen deiner Browserdaten zurücksetzt.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">6. Affiliate-Marketing (Impact.com)</h2>
        <p>
          Sofern du eingewilligt hast, setzen wir Tracking-Technologien des Affiliate-Netzwerks
          Impact (Impact Tech Inc., 2said Place, Suite 200, Santa Barbara, CA 93101, USA) ein.
          Wenn du über einen entsprechend gekennzeichneten Link auf dieser Website zu einem
          Partnerangebot gelangst und dort einen Kauf oder eine andere Aktion abschließt, kann
          Impact dies einem Cookie zuordnen, um eine Provision an uns abzurechnen. Es werden
          dabei pseudonyme Kennungen verarbeitet, jedoch keine direkt identifizierenden Daten an
          uns übermittelt. Rechtsgrundlage ist deine Einwilligung gemäß Art. 6 Abs. 1 lit. a
          DSGVO.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">7. Google AdSense</h2>
        <p>
          Sofern du eingewilligt hast und auf dieser Website Werbeanzeigen über Google AdSense
          (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland) eingebunden
          sind, können dabei Cookies und ähnliche Technologien zur Ausspielung personalisierter
          oder nicht-personalisierter Werbung eingesetzt werden. Google kann hierbei Daten über
          dein Nutzungsverhalten verarbeiten und mit anderen von Google erhobenen Daten
          verknüpfen. Rechtsgrundlage ist deine Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO. Du
          kannst Einstellungen zu personalisierter Werbung von Google unter{" "}
          <a
            href="https://adssettings.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-400 hover:underline"
          >
            adssettings.google.com
          </a>{" "}
          verwalten.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">8. Externe Inhalte (Vorschaubilder &amp; Videos)</h2>
        <p>
          {SITE_NAME} ist eine Suchmaschine für Videomaterial von Drittanbietern. Vorschaubilder
          und Videodateien werden direkt von den Servern der jeweiligen Anbieter geladen — Pexels
          (Pexels GmbH), Pixabay (Pixabay GmbH), YouTube (Google Ireland Limited), Coverr und
          Archive.org (Internet Archive). Beim Laden dieser Inhalte wird deine IP-Adresse an die
          jeweiligen Anbieter übermittelt, unabhängig von deiner Cookie-Einstellung, da dies
          technisch erforderlich ist, um die Inhalte anzuzeigen (Rechtsgrundlage: Art. 6 Abs. 1
          lit. f DSGVO, berechtigtes Interesse an der Darstellung der Suchergebnisse). Es gelten
          zusätzlich die Datenschutzbestimmungen der jeweiligen Anbieter.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">9. Merkliste (Local Storage)</h2>
        <p>
          Wenn du Videos zu deiner Merkliste hinzufügst, werden diese Informationen ausschließlich
          lokal in deinem Browser (Local Storage) gespeichert und nicht an uns oder Dritte
          übertragen. Sie dienen lediglich dazu, dir den gesammelten Download mehrerer Clips zu
          ermöglichen.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">10. Deine Rechte</h2>
        <p>
          Du hast jederzeit das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO),
          Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO),
          Datenübertragbarkeit (Art. 20 DSGVO) sowie Widerspruch gegen die Verarbeitung (Art. 21
          DSGVO) bezüglich deiner personenbezogenen Daten. Wende dich hierfür an die oben unter
          „Verantwortlicher“ genannte Adresse.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">11. Beschwerderecht</h2>
        <p>
          Du hast das Recht, dich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung
          deiner personenbezogenen Daten durch uns zu beschweren, z. B. bei der für deinen
          Wohnort zuständigen Aufsichtsbehörde oder dem Bayerischen Landesamt für Datenschutzaufsicht.
        </p>
      </section>

      <p className="text-sm text-gray-600">
        Stand dieser Datenschutzerklärung: Juni 2026 — {SITE_URL}
      </p>
    </div>
  );
}
