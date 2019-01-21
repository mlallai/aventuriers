import React from "react";
import signupPageStyle from "assets/jss/material-kit-pro-react/views/signupPageStyle.jsx";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import withStyles from "@material-ui/core/styles/withStyles";
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import image from "assets/img/mountain.jpg";
import GridContainer from "components/Grid/GridContainer.jsx";
import FooterBar from "views/Footer/FooterBar.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import HeaderLinksAuth from "components/Header/HeaderLinksAuth.jsx";

const dashboardRoutes = [];

class Terms extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  render() {
    const { classes, ...rest } = this.props;
    const { isAuthenticated, user } = this.props.auth;

    return (
      <div>
        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand="Adventurer"
          links={
            !isAuthenticated ? (
              <HeaderLinks dropdownHoverColor="info" />
            ) : (
              <HeaderLinksAuth dropdownHoverColor="info" />
            )
          }
          fixed
          changeColorOnScroll={{
            height: 100,
            color: "white"
          }}
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <Card className={classes.cardSignup}>
                <h2 className={classes.cardTitle}>Terms & Conditions</h2>
                <CardBody>
                  <GridContainer justify="center">
                    <GridItem xs={12} sm={5} md={5}>
                      <h4>Article 1 - Définitions</h4>
                      On désignera par la suite:
                      <br />
                      - 'Site' : le Site Aventuriers.co et l'ensemble de ses
                      pages et écrans
                      <br />
                      - 'Editeur' : La personne, morale ou physique, responsable
                      de l'édition et du contenu du Site
                      <br />
                      - 'Utilisateur' : Le mobinaute visitant et utilisant le
                      Site
                      <hr />
                      <h4>
                        Article 2 - Mentions imposées par la loi de confiance
                        dans l’économie numérique et objet du Site
                      </h4>
                      Le présent Site est édité par Adventurer SAS. Les
                      informations légales concernant l'Editeur du Site,
                      notamment les coordonnées et les éventuelles informations
                      de capital et d'immatriculation, sont fournies dans les
                      mentions légales du Site. Les informations concernant la
                      collecte et le traitement des données personnelles
                      (politique et déclaration) sont fournies dans la charte de
                      données personnelles du Site. L'objet de la société est la
                      création, le développement, l’édition, la maintenance et
                      la commercialisation de Sites internet, d'applications
                      mobiles, de logiciels et de services informatiques.
                      L'utilisation du Site suppose l’acceptation, par
                      l'Utilisateur, de l’intégralité des présentes conditions
                      générales, qu'il reconnaît du même fait en avoir pris
                      pleinement connaissance. Cette acceptation sera réputée
                      avoir la même valeur qu’une signature manuscrite de la
                      part de l'Utilisateur. L'Utilisateur reconnaît la valeur
                      de preuve des systèmes d’enregistrement automatique de
                      l’Editeur du Site et, sauf pour lui d’apporter une preuve
                      contraire, il renonce à les contester en cas de litige.
                      L’acceptation des présentes conditions générales suppose
                      de la part des Utilisateurs qu’ils jouissent de la
                      capacité juridique nécessaire pour cela. Si l'Utilisateur
                      est mineur ou ne dispose pas de cette capacité juridique,
                      il déclare avoir l’autorisation d’un tuteur, d’un curateur
                      ou de son représentant légal.
                      <hr />
                      <h4>Article 3 – License d’utilisation</h4>
                      L’Editeur accorde à l’Utilisateur un droit et une licence
                      personnels, non transférables et non exclusifs, pour
                      utiliser les services du Site uniquement pour un usage
                      interne, et sous réserve que l’Utilisateur ne tente pas
                      (ou ne permette pas à un tiers) de copier, modifier, créer
                      un produit dérivé du Site ou découvrir un code source,
                      vendre, céder, sous-licencier, accorder une sûreté ou
                      transférer tout droit ou accès au Site, ou aux
                      informations et autres contenus disponibles dans le Site.
                      <hr />
                      <h4>Article 4 - Compte dans le Site</h4>
                      L’Utilisateur créant un compte sur le Site a la
                      possibilité d’y accéder en se connectant grâce aux
                      identifiants fournis lors de son inscription et en
                      utilisant des systèmes tels que des boutons de connexion
                      réseaux sociaux tiers. L’Utilisateur est entièrement
                      responsable de la protection du mot de passe qu’il a
                      choisi. Il est encouragé à utiliser des mots de passe
                      complexes. En cas d’oubli de mot de passe, l’Utilisateur a
                      la possibilité d’en générer un nouveau. Ce mot de passe
                      constitue la garantie de la confidentialité des
                      informations contenues dans son compte et l'Utilisateur
                      s'interdit donc du transmettre ou du communiquer à un
                      tiers. A défaut, l'Editeur du Site ne pourra être tenu
                      pour responsable des accès non autorisés au compte d'un
                      Utilisateur. L’Editeur se réserve le droit exclusif de
                      supprimer le compte de tout Utilisateur qui aurait
                      contrevenu aux présentes conditions générales (notamment
                      mais sans que cet exemple n’ait un quelconque caractère
                      exhaustif, lorsque l’Utilisateur aura sciemment fourni des
                      informations erronées lors de son inscription) ou encore
                      tout compte inactif depuis au moins une année. Ladite
                      suppression ne sera pas susceptible de constituer un
                      dommage pour l’Utilisateur exclu qui ne pourra prétendre à
                      aucune indemnité de ce fait. Cette exclusion n’exclut pas
                      la possibilité, pour l’Editeur, d’entreprendre des
                      poursuites d’ordre judiciaire à l’encontre de
                      l’Utilisateur, lorsque les faits l’auront justifié. Chaque
                      Utilisateur est libre de fermer son compte. Pour ceci,
                      l’Utilisateur doit adresser un e-mail à l'Editeur
                      indiquant qu’il souhaite supprimer son compte. Aucune
                      récupération de ses données ne sera alors possible.
                      L’Utilisateur accepte de ne pas utiliser ou lancer un
                      système automatisé (en ce inclus les « robots ») qui
                      accède au Site de manière à envoyer plus de messages, de
                      demandes, d'informations ou de contenu dans une période
                      donnée que ce qui peut être raisonnablement accompli par
                      un être humain. L’Utilisateur accepte également de ne pas
                      modifier le Site ou une partie de celle-ci, sous quelque
                      forme que ce soit, ni d'utiliser des versions modifiées du
                      Site ou d'autres produits, logiciels ou autres contenus
                      d’Adventurer afin d'obtenir un accès non autorisé au Site
                      pour quelque raison que ce soit, sans le consentement
                      exprès écrit d’Adventurer. L’Utilisateur accepte de ne pas
                      utiliser le Site ou les services du Site à des fins
                      illégales ou interdites par ces conditions d'utilisation.
                      L’Utilisateur accepte également de rembourser à Adventurer
                      tout dommage, perte, coût ou dépense engagée, y compris
                      les frais juridiques, en raison de son utilisation du Site
                      pour un but illégal ou interdit. L’Utilisateur ne peut pas
                      utiliser le Site de manière à endommager, désactiver,
                      surcharger ou nuire au Site ou interférer avec
                      l'utilisation du Site par un autre Utilisateur. En outre,
                      l’Utilisateur ne peut pas rechercher, analyser, tester la
                      vulnérabilité ou enfreindre les mesures de sécurité ou
                      d'authentification du Site. L’Utilisateur ne peut pas
                      obtenir ou tenter d'obtenir des documents ou des
                      informations par quelque moyen que ce soit non
                      intentionnellement mis à disposition ou fourni par le
                      Site. En outre, l’Utilisateur ne peut pas inscrire ou
                      tenter d’inscrire un tiers, sauf autorisation expresse de
                      celui-ci. Le Site peut contenir des profils, des flux
                      d’informations, des zones de discussion, des groupes
                      d’informations, des forums, des communautés, des pages
                      personnelles, des calendriers et / ou d'autres moyens de
                      communication conçus pour permettre à l’Utilisateur de
                      communiquer avec un autre Utilisateur ou un groupe.
                      L’Utilisateur accepte d'utiliser les services de
                      communication uniquement pour publier, envoyer et recevoir
                      des messages et des documents appropriés et liés au
                      service. À titre d'exemple et ce sans exhaustivité,
                      lorsqu’il utilise un service de communication,
                      l’Utilisateur ne peut pas:
                      <br />
                      • Diffamer, abuser, harceler, menacer ou violer les droits
                      légaux (tels que les droits de respect de la vie privée)
                      d'autrui ;<br />
                      • Télécharger, publier, distribuer ou diffuser tout sujet
                      inapproprié, vulgaire, diffamatoire, contrefait, obscène,
                      indécent ou illégal, que ceci concerne une personne, un
                      objet ou une information ;<br />
                      • Télécharger, publier, transmettre ou rendre disponible
                      toute contribution qui porte atteinte à tout brevet,
                      marque, secret commercial, droit d'auteur ou autre droit
                      de la propriété intellectuelle de tout tiers ;<br />
                      • Transmettre, publier, envoyer par courrier électronique
                      ou rendre disponible tout matériel ou contenu contenant
                      des virus ou tout code informatique, fichiers ou
                      programmes conçus pour interrompre, détruire ou limiter
                      les fonctionnalités de tout logiciel ou matériel
                      informatique ou autre appareil de télécommunication ou
                      endommager la propriété d'une autre entité ou personne ;
                      <br />
                      • Télécharger tout fichier publié par un autre Utilisateur
                      du Site dont l’Utilisateur sait qu’il ne peut être
                      légalement partagé ;<br />
                      • Falsifier ou supprimer toutes les contributions
                      d’auteurs, les avis légaux ou autres avis appropriés ou
                      les désignations exclusives ou étiquettes de l'origine ou
                      de la source du logiciel ou de tout autre matériel contenu
                      dans un fichier qui est téléchargé ;<br />
                      • Limiter ou empêcher tout autre Utilisateur d'utiliser et
                      de profiter des services du Site;
                      <br />
                      • Violer tout code de conduite ou d'autres règles qui
                      peuvent s'appliquer à tout service de communication
                      particulier ;<br />
                      • Récolter d'autres informations sur d’autres
                      Utilisateurs, y compris les adresses électroniques, sans
                      leur consentement ;<br />
                      • Violer les lois ou la règlementation applicables ;<br />
                      • Nuire à des personnes mineures de quelque manière que ce
                      soit ;<br />
                      • Falsifier son identité ou celle de toute autre personne
                      ;<br />
                      • Harceler un autre Utilisateur ;<br />
                      • Supprimer ou modifier toute contribution faite par un
                      autre Utilisateur sans son consentement exprès, à moins
                      que cette activité ne soit expressément autorisée par le
                      Site.
                      <br />
                      L’Editeur n'a aucune obligation de surveiller les services
                      de communication. Cependant, l’Editeur se réserve le droit
                      d'examiner les contenus et documents publiés sur ses
                      services de communication et de supprimer tout contenu à
                      son entière discrétion. L’Editeur se réserve le droit de
                      mettre fin à l’accès de l’Utilisateur à tout ou partie des
                      services de communication à tout moment sans préavis pour
                      quelque raison que ce soit. L’Editeur se réserve le droit,
                      à tout moment, de divulguer toute information de façon à
                      être en conformité avec la loi applicable, les règlements,
                      les procédures légales ou les demandes gouvernementales,
                      et éditer, refuser de publier ou supprimer des
                      informations ou du contenu, en tout ou en partie, à sa
                      seule discrétion. Il est conseillé à l’Utilisateur d’être
                      prudent lorsqu’il donne des informations d'identification
                      personnelle sur lui-même ou des tiers. L’Editeur ne
                      contrôle ni ne validu contenu, les messages ou les
                      informations publiés via les services de communication du
                      Site et, par conséquent, l’Editeur décline expressément
                      toute responsabilité en ce qui concerne les services de
                      communication et les actions résultant de la participation
                      de l’Utilisateur à tout service de communication. Les
                      contenus téléchargés dans le Site peuvent être soumis à
                      des limitations sur l'utilisation, la reproduction et / ou
                      la diffusion. L’Utilisateur est responsable du respect de
                      ces limitations si il télécharge ledit contenu. L’Editeur
                      ne possède pas le contenu que l’Utilisateur fournit sur le
                      Site (y compris les commentaires et les suggestions) ou
                      publie, télécharge, inscrit ou envoie via les services de
                      communication du Site, et il peut demander la suppression
                      de ces documents ou de ce contenu à tout moment, à moins
                      que le contenu ait été partagé, copié ou enregistré par
                      d'autres Utilisateurs du Site. Toutefois, en publiant, en
                      téléchargeant, en fournissant ou en soumettant un tel
                      contenu, l’Utilisateur accorde à l’Editeur un droit non
                      exclusif, irrévocable, perpétuel, illimité, entièrement
                      libre de droit, à tout moment et à tout endroit, de
                      copier, publier, dériver, distribuer, traiter, analyser,
                      utiliser et commercialiser, de quelque manière que ce
                      soit, ledit contenu. Tout le contenu affiché, téléchargé,
                      saisi ou soumis par l’Utilisateur sur le Site l’est à ses
                      risques et périls et l’Utilisateur déclare et garantit
                      qu’il dispose de tous les droits pour utiliser ce contenu,
                      qu'il n'est pas confidentiel ou exclusif à un tiers, et
                      qu’il n’est pas non plus en violation d'une loi ou d'une
                      restriction contractuelle.
                      <hr />
                      <h4>
                        Article 5 - Exonération de la responsabilité de
                        l’Editeur dans le cadre de l’exécution du présent
                        contrat
                      </h4>
                      En cas d’impossibilité d’accès au Site, en raison de
                      problèmes techniques ou de toutes natures, l'Utilisateur
                      ne pourra se prévaloir d’un dommage et ne pourra prétendre
                      à aucune indemnité. Les liens hypertextes présents sur le
                      Site peuvent renvoyer sur d'autres Sites ou sur des Sites
                      internet et la responsabilité de l’Editeur du Site ne
                      saurait être engagée si le contenu de ces Sites
                      contrevient aux législations en vigueur. De même la
                      responsabilité de l’Editeur ne saurait être engagée si
                      l'utilisation de ces Sites, par l'Utilisateur, lui causait
                      un préjudice.
                      <hr />
                      <h4>
                        Article 6 - Droits de propriété intellectuelle relatifs
                        aux éléments du Site
                      </h4>
                      Tous les éléments du Site appartiennent à l'Editeur ou à
                      un tiers mandataire, ou sont utilisés par l'Editeur avec
                      l'autorisation duur propriétaire. Toute copie des logos,
                      contenus textuels, pictographiques ou vidéos, sans que
                      cette énumération ne soit limitative, est rigoureusement
                      interdite et s’apparente à de la contrefaçon. Tout
                      Utilisateur qui se rendrait coupable de contrefaçon serait
                      susceptible de voir son compte supprimé sans préavis ni
                      indemnité et sans que cette suppression ne puisse lui être
                      constitutive d’un dommage, sans réserve d’éventuelles
                      poursuites judiciaires ultérieures à son encontre, à
                      l’initiative de l’Editeur du Site ou de son mandataire. La
                      présente Site utilise des éléments (images, photographies,
                      contenus) dont les crédits reviennent à : Adventurer SAS.
                      <hr />
                      <h4>
                        Article 7 - Contribution des Utilisateurs au contenu
                      </h4>
                      Les Utilisateurs se voient offrir la faculté de contribuer
                      aux contenus accessibles par le Site, par la publication
                      de commentaires. Les contributeurs sont informés que
                      l’Editeur, représenté le cas échéant par les modérateurs,
                      peut choisir de publier la contribution en question sur
                      les newsletters du Site et sur les Sites de tous ses
                      partenaires, à charge pour l’Editeur de citer le
                      pseudonyme de l’auteur de la contribution. L’auteur
                      renonce donc à ses droits sur le contenu des
                      contributions, au profit de l’Editeur, pour toute
                      diffusion ou utilisation, même commerciale et ceci, bien
                      évidemment, toujours dans le respect de la paternité de
                      l’auteur.
                      <hr />
                      <h4>Article 8 - Marques</h4>
                      Les marques et logos contenus dans le Site sont déposés
                      par Adventurer, ou éventuellement par un de ses
                      partenaires. Toute personne procédant à leurs
                      représentations, reproductions, imbrications, diffusions
                      et rediffusions encourt les sanctions prévues aux articles
                      L.713-2 et suivants du Code de la propriété
                      intellectuelle.
                      <hr />
                      <h4>Article 9 - Limitation de responsabilité</h4>
                      L'Editeur du Site, notamment dans le processus de vente en
                      ligne, n’est tenu que par une obligation de moyens ; sa
                      responsabilité ne pourra être engagée pour un dommage
                      résultant du Site tel que perte de données, intrusion,
                      virus, rupture du service, ou autres. L'Editeur du Site,
                      Adventurer, ne saurait être tenu pour responsable de
                      l'inexécution du contrat conclu, due à la survenance d'un
                      événement de force majeure et notamment en cas de
                      catastrophes causées par inondations ou incendies.
                      L'Utilisateur admet expressément utiliser le Site à ses
                      propres risques et sous sa responsabilité exclusive. Le
                      Site fournit à l'Utilisateur des informations à titre
                      indicatif, avec des imperfections, erreurs, omissions,
                      inexactitudes et autres ambivalences susceptibles
                      d'exister. En tout état de cause, Adventurer ne pourra en
                      aucun cas être tenu responsable : - de tout dommage direct
                      ou indirect, notamment en ce qui concerne les pertes de
                      profits, le manque à gagner, les pertes de clientèle, de
                      données pouvant entre autres résulter de l'utilisation du
                      Site, ou au contraire de l'impossibilité de son
                      utilisation ; - d'un dysfonctionnement, d'une
                      indisponibilité d'accès, d'une mauvaise utilisation, d'une
                      mauvaise configuration du périphérique de l'Utilisateur,
                      ou encore de l'emploi d'un périphérique peu usité ou
                      obsolète par l'Utilisateur ; - du contenu des publicités
                      et autres liens ou sources externes accessibles par
                      l'Utilisateur à partir du Site.
                      <hr />
                      <h4>Article 10 - Accès au Site par connexion Internet</h4>
                      La responsabilité de l'Editeur ne peut être engagée en
                      raison d'une indisponibilité technique de la connexion,
                      qu'elle soit due notamment à un cas de force majeure, à
                      une maintenance, à une mise à jour, à une modification, à
                      une intervention de l'hébergeur, à une grève interne ou
                      externe, à une panne de réseau, à une coupure
                      d'alimentation électrique, ou encore à une mauvaise
                      configuration ou utilisation du périphérique de
                      l'Utilisateur.
                      <hr />
                      <h4>Article 11 - Clauses diverses</h4>
                      Les présentes conditions générales sont soumises au Site
                      du droit Français. Elles peuvent être modifiées à tout
                      moment par l’Editeur ou son mandataire. Les conditions
                      générales applicables à l’Utilisateur sont celles en
                      vigueur au jour de son achat ou de sa connexion sur le
                      Site. L’Editeur s’engage bien évidemment à conserver
                      toutes ses anciennes conditions générales et à les faire
                      parvenir à tout Utilisateur qui en ferait la demande. Sauf
                      dispositions d’ordre public, tous litiges qui pourraient
                      survenir dans le cadre de l’exécution des présentes
                      conditions générales pourront avant toute action
                      judiciaire être soumis à l’appréciation de l’Editeur en
                      vue d’un règlement amiable. Il est expressément rappelé
                      que les demandes de règlement amiable ne suspendent pas
                      les délais ouverts pour intenter les actions judiciaires.
                      Sauf disposition contraire, d’ordre public, toute action
                      judiciaire relative à l’exécution du présent contrat devra
                      être soumise à la compétence des juridictions du ressort
                      de la Cour d’appel saisie.
                      <hr />
                      <h4>
                        Article 12 - Utilisation de Cookies et de fichiers
                        déposés sur le périphérique
                      </h4>
                      Le mot « Cookie » est ici utilisé au sens large et englobe
                      tout fichier déposé sur le périphérique de l'Utilisateur
                      afin de l'identifier ou de sauvegarder des informations de
                      manière durable sur le périphérique. Un « Cookie » permet
                      l'identification de l'Utilisateur, la personnalisation de
                      sa consultation et l'accélération de l’affichage du Site
                      grâce à l'enregistrement d'un fichier de données sur son
                      périphérique. Le Site est susceptible d'utiliser des «
                      Cookies » principalement pour 1) permettre à le Site de
                      mémoriser les actions et réglages de l'Utilisateurs dans
                      le Site, 2) obtenir des statistiques de navigation afin
                      d'améliorer l'expérience de l'Utilisateur, et 3) permettre
                      l'accès à un compte de Utilisateur et à du contenu qui
                      n'est pas accessible sans connexion. L'Utilisateur
                      reconnaît être informé de cette pratique et autorise
                      l'Editeur à y recourir. L'Utilisateur peut refuser
                      l'enregistrement de « Cookies » en changeant les réglages
                      de son périphérique ou du Site, mais l'Editeur ne peut
                      alors garantir que le Site fonctionnera comme attendu, et
                      ne prendra aucune responsabilité en cas de
                      non-fonctionnement du Site.
                      <hr />
                      <h4>Article 13 - Encadrement des conditions</h4>
                      Si une disposition des Conditions générales est jugée
                      illégale, nulle ou pour toute autre raison inapplicable,
                      alors cette disposition sera réputée divisible des
                      Conditions et n'affectera pas la validité et
                      l'applicabilité des dispositions restantes. Ces présentes
                      conditions décrivent l’ensemble de l’accord entre
                      l’Utilisateur et l'Editeur. Elles remplacent tous accords
                      antérieurs ou contemporains écrits ou oraux. Les
                      conditions générales ne sont pas cessibles, transférables
                      ou sous-licenciable par l’Utilisateur lui-même. Une
                      version imprimée des Conditions et de tous les avis donnés
                      sous forme électronique pourra être demandée dans des
                      procédures judiciaires ou administratives en rapport avec
                      les conditions générales. Les parties conviennent que
                      toute la correspondance relative à ces conditions
                      générales doit être rédigée dans la langue française.
                      <hr />
                      <h4>Article 14 - Notifications</h4>
                      Toute notification ou avis concernant les présentes
                      conditions générales, les mentions légales ou la charte de
                      données personnelles doit être faite par écrit et doit
                      être remis en mains propres, courrier recommandé ou
                      certifié, par Poste ou tout autre service de messagerie
                      reconnu au niveau national qui permet de suivre
                      régulièrement ses forfaits, ou encore par mail aux
                      adresses indiquées dans les mentions légales du Site, en
                      précisant vos noms, prénoms, coordonnées et objet de
                      l’avis.
                      <hr />
                      <h4>Article 15 - Réclamations</h4>
                      Toute réclamation liée à l'utilisation du Site, des pages
                      du Site sur des réseaux sociaux éventuels ou les
                      conditions générales, mentions légales ou charte de
                      données personnelles doit être déposée dans les 365 jours
                      suivant le jour d’origine du problème source de
                      réclamation, et ce indépendamment de toute loi ou règle de
                      droit contraire. Dans le cas où une telle réclamation
                      n’aurait pas été déposée dans les 365 jours suivants, une
                      telle réclamation sera à jamais inapplicable en justice.
                      <hr />
                      <h4>Article 16 - Inexactitudes</h4>
                      Il peut être possible que se trouvent, dans l’ensemble du
                      Site, et dans une mesure restreinte, des inexactitudes ou
                      des erreurs, ou des informations qui soient en désaccord
                      avec les présentes Conditions Générales, les Mentions
                      Légales ou la Charte de Données personnelles du Site. En
                      outre, il est possible que des modifications non
                      autorisées soient faites par des tiers sur Le Site ou sur
                      des services annexes (réseaux sociaux…). Dans une telle
                      situation, l'Utilisateur a la possibilité de contacter
                      l'Editeur par courrier postal ou par mail aux adresses
                      indiquées dans les mentions légales du Site, avec si
                      possible une description de l'erreur et son emplacement
                      dans le Site, ainsi que des informations suffisantes
                      permettant du contacter.
                      <hr />
                      <h4>Article 17 - Géolocalisation</h4>
                      Conformément à l'article L. 34-1-V du code des postes et
                      des communications électroniques, le Site collectant des
                      données de localisation, elle doit permettre à
                      l'Utilisateur de rendre son accord exprès lors de
                      l'installation et de modifier ce choix par la suite.
                      L'utilisation de la fonctionnalité de géolocalisation du
                      Site nécesSite le consentement préalable exprès de
                      l'Utilisateur à être géolocalisé. Pour cela l'Utilisateur
                      devra activer, s'il le souhaite, la fonction de
                      géolocalisation directement dans les réglages de son
                      terminal mobile et accepter que le Site puisse y avoir
                      recours. Cette fonctionnalité peut, à tout moment, et sans
                      frais, être désactivée ou activée. Grâce à l'acceptation
                      de la fonction de géolocalisation par GPS du périphérique
                      et du Site, les services suivants sont offerts à
                      l'Utilisateur : proposition de profils d'Utilisateurs
                      selon leur proximité géographique. Le périphérique calcule
                      alors lui-même sa position. La désactivation de
                      géolocalisation par le Site et/ou de la géolocalisation du
                      périphérique bloque les services offerts par le Site qui y
                      sont liés et l'affichage de publicités géociblées. Tous
                      droits réservés - 01 Janvier 2019
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridContainer>
          </div>
        </div>
        <FooterBar />
      </div>
    );
  }
}

Terms.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withStyles(signupPageStyle)(Terms));
