/* eslint-disable max-len */
import React, { ReactElement } from 'react';
import { Text } from 'components';
import styles from './styles.module.scss';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UlListComponent = ({ list }: { list: (string | ReactElement)[] }) => (
  <ul className={styles.listWrapper}>
    {list.map((el) => (
      <li className={styles.listColor} key={el.toString()}>
        <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
          {el}
        </Text>
      </li>
    ))}
  </ul>
);

type OlListElement = {
  content: string;
  children: OlListElement[];
};

type OlListComponentProps = {
  list: OlListElement[];
  level?: number;
};

const olLevelPadding = 14;
const OlListComponent = ({ list, level = 1 }: OlListComponentProps) => {
  let currentLevel = level;
  return (
    <ol className={styles.listWrapper} style={{ paddingLeft: currentLevel * olLevelPadding }}>
      {list.map((el) => (
        <li className={styles.listColor} key={el.content}>
          <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
            {el.content}
          </Text>
          {/* eslint-disable-next-line no-plusplus */}
          {el.content && <OlListComponent list={el.children} level={currentLevel++} />}
        </li>
      ))}
    </ol>
  );
};

// TODO: create element config with props
const Terms = () => (
  <div className={styles.wrapper}>
    <div className={styles.container}>
      <Text color="darkDefault" variant="subtitle-1">
        PAYTOSAVE LIMITED
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        Company No.: 227963
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        Address: Republic of Seychelles Suite 1, Second Floor, Sound & Vision House, Francis Rachel
        Str.,
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        Last updated 22 June 2022.
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        These Terms of Use (“Terms”) govern your access and use of the Services provided by
        Paytosave Limited and its related companies and affiliates (“our,” “we,” “Paytosave”). Our
        services include: (1) the content on our website located at{' '}
        <a className={styles.link} href={window.location.hostname} target="_blank" rel="noreferrer">
          {window.location.hostname}
        </a>{' '}
        (“Website”) or any other websites, pages, features, or content we own or operate
        (collectively, the “Sites”) or when you use our mobile app; (2) any application program
        interface (“API”) made available by Paytosave Limited to you as a service or third-party
        applications relying on such an API (“Paytosave Limited APIs”); (3) the Platform (defined
        below) which provides Digital Asset (defined below) trading services (“Trading Services”);
        (4) Paytosave Limited or its affiliates staking of Digital Assetsthat you may designate
        (“Staking Services”); and (5) and any other services that Paytosave Limited may make
        available from time to time (collectively, the “Services”).
      </Text>
      <Text className={styles.heading} color="darkDefault" variant="subtitle-2">
        1. Binding Contract
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        These Terms form a binding contract between you and Paytosave Limited . Please read these
        Terms carefully. You agree that you have read, understand, and accept these Terms by signing
        up for an Account(s) with Paytosave Limited , accessing our Website, or Paytosave Limited
        APIs (where available). If you do not agree with these Terms, do not access or use the
        Services, Sites, or any other aspect of our business.
      </Text>
      <Text className={styles.heading} color="darkDefault" variant="subtitle-2">
        2. Trading Risks
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        <b>2.1. Forks</b> t is possible that planned, unplanned, sudden, scheduled, expected,
        unexpected, publicized, not well-known, consensual, and/or controversial changes to the
        underlying operating rules of certain Digital Assets may occur from time to time in such a
        way as to result in the creation of one or more related versions of an existing Digital
        Asset (each instance of any such change, a <b>“Fork”</b>). Forks may result in multiple
        versions of a Digital Asset and could lead to the dominance of one or more such versions of
        a Digital Asset (each a <b>“Dominant Digital Asset”</b>) and the partial or total
        abandonment or loss of value of any other versions of such Digital Asset (each a{' '}
        <b>“Non-Dominant Digital Asset”</b>). We are under no obligation to support a Fork of a
        Digital Asset that you hold in your Account(s), whether or not any resulting version of such
        Forked Digital Asset is a Dominant Digital Asset or a Non-Dominant Digital Asset. If we
        elect, at our sole and absolute discretion, to support a Fork of a Digital Asset, we will
        make a public announcement through the Website. Under no circumstances shall any of the
        Indemnified Persons (defined below) be responsible or liable for any direct or indirect
        losses (including loss of profits, business, or opportunities), damages or costs suffered by
        you or any other person or entity, arising from or in connection with any of the Indemnified
        Persons’ (1) decision to support suchFork or the timing of implementation of such support,
        or (2) decision to not support a Fork of any given Digital Asset, including the
        determination to support, continue to support, or cease to support any Dominant Digital
        Asset or Non-Dominant Digital Asset.
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        <b>2.2.Disclosure.</b> YOU ACKNOWLEDGE AND ACCEPT THE FOLLOWING RISKS, IN ADDITIONAL TO
        RISKS PUBLISHED BY PAYTOSAVE LIMITED THROUGH ONE OR MORE RISK DISCLOSURES ON ITS WEBSITE,
        RELATING TO THE USE OF THE PLATFORM AND THE SERVICES:
        <UlListComponent
          list={[
            'the risk of loss in trading Digital Assets may be substantial and losses may occur over a short period of time;',
            'the price and liquidity of Digital Assets has been subject to large fluctuations in the past and may be subject to large fluctuations in the future;',
            'Digital Assets are not legal tender, and are not backed by any government;',
            'legislative and regulatory changes or actions at the national or international level may adversely affect the use, transfer, trade, and value of Digital Assets;',
            'Digital Asset blockchains may Fork, and we may not support the Forked Digital Asset promptly or at all;',
            'Transactions (defined below) in Digital Assets may be irreversible, and accordingly, losses due to fraudulent or accidental Transactions may not be recoverable;',
            'some transactions in Digital Assets shall be deemed to be made when recorded on a public ledger, which is not necessarily the date or time that you or any other user initiates or completes the Transactions on the Platform;',
            'the value of Digital Assets may be derived from or influenced by the continued willingness of market participants to trade fiat currencies for Digital Assets, which may result in the potential for permanent and total loss of value of a particular Digital Asset should the market for that Digital Asset disappear;',
            'the nature of Digital Assets may lead to an increased risk of fraud or cyberattack and may mean that technological difficulties experienced by PAYTOSAVE LIMITED may prevent access to, or use of, your Digital Assets;',
            'PAYTOSAVE LIMITED may experience sophisticated cyberattacks, unexpected surges in activity, or other operational or technical difficulties that may cause interruptions in the Services;',
            'PAYTOSAVE LIMITED having Digital Assets on deposit or with any third-party in a custodial relationship has attendant risks, which include security breaches, risk of contractual breach, and risk of loss;',
            'Digital Assets blockchains may become congested or become nonoperational because of attacks, bugs, hard forks, or other unforeseeable reasons',
          ]}
        />
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        PAYTOSAVE LIMITED does not provide any financial, investment, business, accounting, tax,
        legal, or other advice to you. All Transactions are executed automatically, based on your
        Instructions (defined below), and you are solely responsible for determining whether any
        investment, investment strategy, or Transaction is appropriate for you based on your
        personal investment objectives, financial circumstances, and risk tolerance.
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        <b>2.3 Digital Asset Delisting.</b> From time to time and in our sole and absolute
        discretion, we may remove one or more Digital Assets from the Platform such that you will no
        longer be able to access such Digital Assets as part of the Trading Services and will be no
        longer able to maintain balances in such Digital Assets or make any deposits or withdrawal
        thereof, in each case with immediate effect for any reason or no reason whatsoever,
        including, without limitation, where we are required to do so by any applicable law or
        regulation (including, without limitation, any U.S. federal or state securities laws), or
        any court or authority to which we are subject in any jurisdictions. You hereby acknowledge
        and consent to that our ability to take such delisting actions, including, without
        limitations, to cancel your outstanding Instructions for delisted Digital Assets and require
        you to remove delisted Digital Assets within a reasonable period of time, beyond which you
        will no longer be able to access the delisted Digital Assets. Under no circumstances shall
        any of the Indemnified Persons be responsible or liable for any direct or indirect losses
        (including loss of profits, business, or opportunities), damages or costs suffered by you or
        any other person or entity, due to any of the Indemnified Persons’ action or inaction in
        accordance with these Terms.
      </Text>
      <Text className={styles.heading} color="darkDefault" variant="subtitle-2">
        3. Eligibility
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        To be eligible to use the Services, you must satisfy the following:
      </Text>
      <UlListComponent
        list={[
          <>
            <b>Authorized User.</b> You must be an individual, corporation, legal person, entity, or
            other organization with the full power, authority, and capacity to (1) access and use
            our Services and (2) enter into, deliver, and perform your obligations under these
            Terms. If you are an individual, you must be at least 18 years old.
          </>,
          <>
            <b>U.S. Person.</b> You are a U.S. Person and are not a resident of a Restricted State.{' '}
            <b>“U.S. Person”</b> means any of the following:
          </>,
          <>
            a citizen of the United States of America (<b>“U.S.”</b>);
          </>,
          <>
            a U.S. resident - meaning (1) a green card holder; or (2) an individual physically
            present in the U.S. for 31 days in the current calendar year and 183 days during the
            three year period that includes the current year and the two years immediately before
            that, counting: (a) all the days present in the U.S. in the current year; (b). 1/3 of
            the days present in the U.S. in the first year before the current year; and (c) 1/6 of
            the days present in the U.S. in the second year before the current year; (3) an
            individual designated a resident for U.S. tax purposes; or (4) an individual with a U.S.
            mailing address.
          </>,
          'a corporation, partnership, or entity organized or existing under the laws of any state territory or possession of the U.S.;',
          'an estate or trust of which any executor, administrator, or trustee is a U.S. Person;',
          'an agency or branch of a foreign entity located in the U.S.;',
          'a discretionary or non-discretionary account held by a fiduciary for the benefit or account of a U.S. Person;',
          'a non-U.S. partnership, corporation, or entity owned or controlled by a U.S. Person (ownership of 10% or more by a U.S. Person); or',
          'a partnership, corporation, or entity with a U.S. mailing address',
          <>
            <b>Representations And Warranties.</b> You agree that all of your representations and
            warranties, as set out in these Terms, are true, accurate, and complete.
          </>,
          <>
            Covenants. You agree that you have and will perform all of your covenants, agreements,
            obligations or undertakings as set out in these Terms.
          </>,
        ]}
      />
      <Text className={styles.heading} color="darkDefault" variant="subtitle-2">
        Use Of The Services
      </Text>
      <UlListComponent
        list={[
          <>
            <b>Digital Assets Trading Platform.</b> PAYTOSAVE LIMITED operates a platform (
            <b>“Platform”</b>) that provides you with Trading Services for digital assets (also
            known as a ‘cryptocurrency’ or ‘virtual currency’), which is issued, stored, and/or
            transferred based on the protocol of a computer network known as a blockchain or a
            public transaction ledger (“Digital Assets”). You may use the Platform to execute the
            following trades: (1) sale of a Digital Asset for fiat or another Digital Asset; and (2)
            purchase of a Digital Asset with fiat or another Digital Asset. In order to provide a
            liquid market and prices for Digital Assets, you acknowledge and agree that third
            parties, which may include affiliates or related corporations of PAYTOSAVE LIMITED , may
            act as market makers and transact on the Platform as your counterparty.
          </>,
          <>
            <b>Staking Services.</b> You may be eligible to stake Digital Assets in a third-party
            proof of stake network via the Staking Services. If you designate Digital Assets for the
            Staking Services, PAYTOSAVE LIMITED will stake the designated Digital Assets by acting
            as a transaction validator on the applicable network for the Digital Asset being staked.
            If PAYTOSAVE LIMITED successfully validates a block of transactions in a particular
            Digital Asset, you may earn a reward granted by that Digital Asset’s network. The reward
            will be determined by the protocols of the applicable network. You have no rights to
            staking rewards until such rewards are received by PAYTOSAVE LIMITED , at which time
            PAYTOSAVE LIMITED will promptly transfer your portion of the staking reward into the
            account you opened with PAYTOSAVE LIMITED for the purposes of procuring any Service (
            <b>“Account”</b>). There is no guarantee that you will receive a staking reward when you
            designate your Digital Assets for Staking Services. PAYTOSAVE LIMITED will use
            commercially reasonable efforts to stake any Digital Assets for which you are using
            Staking Services. If PAYTOSAVE LIMITED incurs a penalty (e.g., through slashing) for its
            failure to validate a block after being selected by a particular network, PAYTOSAVE
            LIMITED shall reimburse you to ensure that you do not incur a financial loss and are
            made whole. For the avoidance of doubt, you shall not be entitled to an amount greater
            than the amount you designated to PAYTOSAVE LIMITED for the applicable Staking Service.
            Staking Services may be made available to you where staking functionality is available
            on the Platform. You are not required to stake with PAYTOSAVE LIMITED to maintain an
            Account(s) or use our Services. You may opt-in or opt-out of Staking Services at any
            time.
          </>,
          <>
            <b>Other Services.</b> PAYTOSAVE LIMITED may make available other services from time to
            time, which shall be subject to such terms and conditions as may be established by
            PAYTOSAVE LIMITED and published on the Sites.
          </>,
          <>
            <b>Third-Party Payment Partners.</b> We may use a third-party payment processor to
            process any U.S. dollar payment between you and PAYTOSAVE LIMITED , including but not
            limited to payments in relation to your use of withdrawals or deposits and Digital Asset
            Transactions. The name on your linked bank account must match the name verified on your
            Account(s).
          </>,
        ]}
      />
      <Text className={styles.heading} color="darkDefault" variant="subtitle-2">
        Account Creation
      </Text>
      <UlListComponent
        list={[
          <>
            <b>Setup.</b> Full use of our Services requires that you create an Account(s) by: (1)
            providing us with information such as your full name, email address (temporary,
            disposable, selfdestructive or similar email addresses are prohibited), and such other
            information as we may require; (2) selecting a strong password; and (3) accepting these
            Terms. PAYTOSAVE LIMITED reserves sole and absolute discretion to accept or reject any
            application for any reason or for no reason whatsoever, or limit the number of
            Account(s) that you may hold. Under no circumstances shall any of the Indemnified
            Persons (defined below) be responsible or liable to you or any other person or entity
            for any direct or indirect losses (including loss of profits, business or
            opportunities), damages, or costs arising from our decision to reject your application
            to open an Account(s).
          </>,
          <>
            <b>Identity Verification.</b> As a money services business registered with the U.S.
            Department of the Treasury’s Financial Crimes Enforcement Network, PAYTOSAVE LIMITED is
            required to, among other things, identify users on our Platform. You agree to provide us
            with the information we request for the purposes of identity verification and the
            detection of money laundering, terrorist financing, fraud, or any other financial crime
            and permit us to keep a record of such information for at least six years (see below for
            details). You will need to complete certain verification procedures before you are
            permitted to use the Services and your access to one or more Account(s) or the Services,
            and the Limits (defined below) that apply to your use of the Account(s) or the Services
            may be altered as a result of information collected on an ongoing basis. The information
            we request may include certain personal information, including, but not limited to, your
            name, address, telephone number, email address, date of birth, taxpayer identification
            number, government identification number and scans of government-issued identity
            documents. In addition to providing this information, to facilitate compliance with
            global industry standards for data retention, you agree to permit us to keep a record of
            such information for the lifetime of your Account(s) plus six years beyond the
            termination of your Account(s). You agree to keep us updated if any of the information
            you provide changes. You authorize us to make inquiries, whether directly or through
            third parties, that we consider necessary to verify your identity or protect you and/or
            us against fraud, money laundering, terrorist financing, or other financial crime, and
            to take any action we deem necessary based on the results of such inquiries. When we
            carry out these inquiries, you acknowledge and agree that your personal information may
            be disclosed to identity verification, compliance data recordation, credit reference,
            fraud prevention, or financial crime agencies and that these agencies may respond to our
            inquiries in full. If there is reasonable doubt that any information provided by you is
            wrong, untruthful, outdated, or incomplete, PAYTOSAVE LIMITED shall have the right to
            send you a notice to request corrections, remove relevant information directly and, as
            the case may be, terminate all or part of the Services provided to you. PAYTOSAVE
            LIMITED shall also have the right, in its sole and absolute discretion, to terminate,
            suspend, or restrict your access to any Account(s) or Services should an issue arise
            with identity verification, including but not limited to circumstances in which
            PAYTOSAVE LIMITED has requested additional verification information from you but has not
            yet received or processed that information. Under no circumstances shall any of the
            Indemnified Persons be responsible or liable for any direct or indirect losses
            (including loss of profits, business, or opportunities), damages, or costs suffered by
            you or any other person or entity due to any such termination, suspension, or
            restriction of access to any Account(s) or Services. Furthermore, you shall be solely
            and fully responsible for any loss or expenses incurred during the use of the Services
            if you cannot be reached through the contact information provided.
          </>,
          <>
            <b>Enhanced Due Diligence.</b> We may require you to submit additional information about
            yourself or your business, provide records or documentation, or have face to face
            meetings with representatives of PAYTOSAVE LIMITED (such process,{' '}
            <b>“Enhanced Due Diligence”</b>). We reserve the right to charge you for any costs and
            fees PAYTOSAVE LIMITED incurs in associated with such Enhanced Due Diligence. PAYTOSAVE
            LIMITED shall have the right, in its sole and absolute discretion, to suspend or
            restrict your access to any Account(s) or Services pending submission of such Enhanced
            Due Diligence. Under no circumstances shall any of the Indemnified Persons be
            responsible or liable for any direct or indirect losses (including loss of profits,
            business, or opportunities), damages, or costs suffered by you or any other person or
            entity due to any such termination, suspension, or restriction of access to any
            Account(s) or Services.
          </>,
          <>
            <b>Access.</b> To access your Account(s) or the Services, you must have the necessary
            equipment (such as a computer or smartphone) and the associated access to the Internet.
            Your Account(s) or the Services can be accessed directly using the Website or by such
            other mode of access (including but not limited to through the PAYTOSAVE LIMITED APIs)
            as PAYTOSAVE LIMITED may prescribe from time to time. The use of the Website and other
            methods may be subject to such additional terms as may be prescribed by PAYTOSAVE
            LIMITED . You are only permitted to access your Account(s) using your Account(s) login
            credentials and other required forms of authentication. We require multifactor
            authentication to keep your Account(s) safe and secure. As a result, you may be required
            to use at least two forms of authentication when accessing your Account(s) and
            performing certain operations in your Account(s). Forms of multi-factor authentication
            in addition to your login credentials may include verification tokens delivered through
            SMS or a specified and supported 2FA application. If you choose to install and use
            two-factor authentication (<b>“2FA”</b>) on a device (e.g., phone or tablet) on which
            the operating system has been tampered with in any way, you do so at your own risk. This
            includes, but is not limited to, a “rooted” (Android) or “jailbroken” (iOS) device. We
            reserve the right in our sole discretion to prohibit access from or by any device on
            which the operating system has been or is suspected of having been modified or tampered
            with. You agree that we may provide your 2FA data to a third-party service provider in
            order to help us authenticate you. You must update to the most recent operating
            system(s) supported by PAYTOSAVE LIMITED or its affiliates on your necessary equipment
            (such as a computer or smartphone) as soon as such operating system(s) update becomes
            available. We reserve the right in our sole discretion to limit or suspend the Services
            offered to you if you attempt to access your Account(s)or the Services on an outdated or
            unsupported operating system(s). As further described under no warranty PAYTOSAVE
            LIMITED does not represent or warrant that your Account(s) or any Services will be
            available without interruption. Under no circumstances shall any of the Indemnified
            Persons be responsible or liable for any direct or indirect losses (including loss of
            profits, business, or opportunities), damages, or costs suffered by you or any other
            person or entity due to an interruption in your access to your Account(s) or any
            Services.
          </>,
          <>
            <b>Personal Account Usage.</b> You must ensure that Account(s) registered under your
            name will not be used by any other person. You must notify us immediately of any breach
            of security, loss, theft, or unauthorized use of your username, password, or security
            information. PAYTOSAVE LIMITED reserves the right to terminate, suspend, or restrict
            your access to any Account(s) or Services if there is reasonable suspicion, as
            determined in PAYTOSAVE LIMITED ’s sole and absolute discretion, that the person logged
            into your Account(s) is not you or if we suspect that the Account(s) have been or will
            be used for any illegal, fraudulent, or unauthorized purposes. Under no circumstances
            shall any of the Indemnified Persons be responsible or liable for any direct or indirect
            losses (including loss of profits, business, or opportunities), damages, or costs
            suffered by you or any other person or entity due to any such termination, suspension,
            or restriction of access to any Account(s) or Services.
          </>,
          <>
            <b>Corporate Account Usage.</b> If you are a corporation, legal person, entity, or other
            organization for whom PAYTOSAVE LIMITED maintains a corporate account for the provision
            of services (<b>“Corporate Account”</b>), you must ensure that your Corporate Account(s)
            will not be used by persons that have not completed identity verification. You must
            notify us immediately of any breach of security, loss, theft, or unauthorized use of
            your username, password, or security information. PAYTOSAVE LIMITED reserves the right
            to terminate, suspend, or restrict your access to any Corporate Account(s) or Services
            if there is reasonable suspicion, as determined in PAYTOSAVE LIMITED ’s sole and
            absolute discretion, that the person logged into your Corporate Account(s) is not the
            natural person authorized to use the Corporate Account or if we suspect that the
            Corporate Account(s) have been or will be used for any illegal, fraudulent, or
            unauthorized purposes. Under no circumstances shall any of the Indemnified Persons be
            responsible or liable for any direct or indirect losses (including loss of profits,
            business or opportunities), damages, or costs suffered by you or any other person or
            entity due to any such termination, suspension, or restriction of access to any
            Corporate Account(s). At PAYTOSAVE LIMITED ’s discretion, you may access the segregated
            account nested under the primary Corporate Account (<b>“Sub-Account”</b>) feature on the
            Platform. Each natural person associated with a Sub-Account must undergo identity
            verification. Only one natural person may be associated with a particular Sub-Account.
            You must notify us immediately of any breach of security, loss, theft, or unauthorized
            use of your username, password, or security information. PAYTOSAVE LIMITED reserves the
            right to terminate, suspend, or restrict your access to any or all of the Services, if
            there is reasonable suspicion, as determined in PAYTOSAVE LIMITED ’s sole and absolute
            discretion, that more than one natural person has access to and/or transacts using the
            same Sub-Account, or if we suspect that SubAccount(s) have been or will be used for any
            illegal, fraudulent, or unauthorized purposes. Under no circumstances shall any of the
            Indemnified Persons be responsible or liable for any direct or indirect losses
            (including loss of profits, business or opportunities), damages, or costs suffered by
            you or any other person or entity due to any such termination, suspension, or
            restriction of access to any Corporate Account(s).
          </>,
          <>
            <b>Safeguarding Your Account.</b> At all times, you shall maintain adequate security and
            control of all of your Account(s)details, passwords, personal identification numbers,
            API keys, API secret keys, or any other codes that you use to access your Account(s) or
            the Services or to send any instruction, request, or order given to PAYTOSAVE LIMITED in
            relation to the operation of your Account(s)or to execute any Transaction (defined
            below), through such medium and in such form and manner as PAYTOSAVE LIMITED may require
            (<b>“Instruction”</b>) to us.
          </>,
          <>
            <b>Information.</b> PAYTOSAVE LIMITED reserves the right to request, and you agree to
            provide, any and all information and documents PAYTOSAVE LIMITED deems relevant or
            necessary in connection with the use of the Platform and/or the Services. PAYTOSAVE
            LIMITED shall have the right, in its sole and absolute discretion, to suspend or
            restrict your access to any Account(s) or Services pending submission of such
            information and documents. Under no circumstances shall any of the Indemnified Persons
            be responsible or liable for any direct or indirect losses (including loss of profits,
            business, or opportunities), damages, or costs suffered by you or any other person or
            entity due to any such termination, suspension, or restriction of access to any
            Account(s) or Services.
          </>,
          <>
            <b>Account Closure.</b> You may terminate your Account(s) at any time by following the
            account termination procedures as prescribed by PAYTOSAVE LIMITED from time to time. You
            will not be charged for terminating your Account(s), although you will be required to
            pay any outstanding amounts owed to us. You authorize us to cancel or suspend any
            pending transactions at the time of cancellation.
          </>,
          <>
            <b>Account Termination, Suspension, or Restriction.</b> PAYTOSAVE LIMITED has the right
            to terminate, suspend, or restrict your access to your Account(s) or Services, as well
            as take any other action as we deem necessary, in the event that you are not, or are no
            longer, eligible to use the Services. Under no circumstances shall any of the
            Indemnified Persons be responsible or liable for any direct or indirect losses
            (including loss of profits, business, or opportunities), damages, or costs suffered by
            you or any other person or entity due to any such termination, suspension, or
            restriction of access to any Account(s), or any other action taken by any of the
            Indemnified Persons in connection with your ineligibility to use the Services.
          </>,
        ]}
      />
      <Text className={styles.heading} color="darkDefault" variant="subtitle-2">
        Transactions
      </Text>
      <UlListComponent
        list={[
          <>
            <b>Transactions.</b> When you sell, purchase, or carry out other transactions in Digital
            Asset(s), other asset(s), or product(s) as PAYTOSAVE LIMITED may from time to time
            permit to be carried out on the Platform (“Transactions”), you are not Transacting with
            PAYTOSAVE LIMITED . Rather, PAYTOSAVE LIMITED acts as the agent, transacting on your
            behalf, to facilitate such Transaction between you and other users. You can purchase
            Digital Asset(s) using: (1) Digital Asset(s) or fiat monies in your PAYTOSAVE LIMITED
            Account(s); (2) a valid bank account in the name that matches your Account(s); or (3) a
            credit or debit card in the name that matches your Account(s) (“Payment Methods”). Using
            a Payment Method to purchase Digital Asset(s) generally will initiate on the Business
            Day (defined below) that we receive your Instructions. Digital Asset(s) that you
            purchase will be deposited into your Account(s) as soon as the funds have settled to
            PAYTOSAVE LIMITED , which may take up to five Business Days if the purchase was made via
            a bank account, credit, or debt card. As further described under no warranty, PAYTOSAVE
            LIMITED does not represent or warrant that any Transaction will be completed
            successfully or within a specific time period. Under no circumstances shall any of the
            Indemnified Persons be responsible or liable for any direct or indirect losses
            (including loss of profits, business, or opportunities), damages, or costs suffered by
            you or any other person or entity due to the failure of a Transaction or the length of
            time needed to complete any Transaction.
          </>,
          <>
            <b>Trading Rules.</b> You agree to adhere to, and be bound by, the Trading Rules.
            PAYTOSAVE LIMITED may, from time to time at its sole and absolute discretion, amend,
            supplement, or replace the Trading Rules, which shall be binding on you if you continue
            to maintain your Account(s) or use any of the Services after the effective date of any
            such amendment, supplement, or replacement of the Trading Rules.
          </>,
          <>
            <b>Market Makers.</b> You acknowledge, agree, and accept that: (1) one or more market
            makers (which may include affiliates or related corporations of PAYTOSAVE LIMITED acting
            in such capacity) may be appointed by PAYTOSAVE LIMITED to promote liquidity on the
            Platform, and any such market maker may enter into any Transaction with you as your
            counterparty; (2) market makers may also maintain positions in various Digital Assets as
            part of their market making activities, including positions in Digital Assets that are
            contrary to your positions; and (3) under no circumstances shall any of the Indemnified
            Persons be responsible or liable for any direct or indirect losses (including loss of
            profits, business, or opportunities), damages, or costs suffered by you or any other
            person or entity as a result of the market making activities of the market makers.
          </>,
          <>
            <b>Limits.</b> You may be subject to limits on the value of Transactions, or deposits
            into or withdrawals out of your Account(s) (together, <b>“Limits”</b>), stated in USD,
            that you may transact in a given period (e.g. daily). To view the Limits applicable to
            you, please refer to our Trading Rules page. We reserve the right to change any
            applicable Limits from time to time in our sole and absolute discretion. If you wish to
            increase the Limits applicable to you, you may submit a request to our user support team
            via our Support page. PAYTOSAVE LIMITED may, in its sole and absolute discretion,
            increase your Limit, lower your Limit, or maintain your current Limit, in each case
            subject to any further conditions that we deem necessary.
          </>,
          <>
            <b>Unauthorized Transactions.</b> You are solely responsible for the control and use of
            your Account(s) and any Instruction sent from your Account(s) is deemed to be authorized
            and is binding on you. We are not obliged to verify the identity or authority of any
            person(s) using your Account(s) and we shall be at liberty to accept, and rely on, any
            Instruction sent from your Account(s). Notify us immediately if you notice unauthorized
            or suspicious activity in your Account(s). Under no circumstances shall any of the
            Indemnified Persons be responsible or liable for any direct or indirect losses
            (including loss of profits, business, or opportunities), damages, or costs suffered by
            you or any other person or entity, arising from or in connection with any of the
            Indemnified Persons’ reliance on any Instruction sent from your Account(s).
          </>,
          <>
            <b>Retention Of Transaction Information.</b> To facilitate compliance with global
            industry standards for data retention, you agree to permit us (but agree to not require
            us) to keep a record of all Transaction information for the lifetime of your Account(s)
            plus six years beyond your Account(s) termination. Please review our Privacy Policy for
            more information on how we collect and use data relating to the use and performance of
            our Sites and Services.
          </>,
        ]}
      />
      <Text className={styles.heading} color="darkDefault" variant="subtitle-2">
        Transactions
      </Text>
      <UlListComponent
        list={[
          <>
            <b>Your Instructions.</b> You are solely responsible for accurately entering any
            Instruction. PAYTOSAVE LIMITED is not obliged to verify the accuracy or completeness of
            any such information or Instruction, for monitoring, or refusing to process duplicate
            Instructions. Your Instructions are irrevocable, unconditional, and are binding on you,
            and such Instructions may be acted or relied upon by us irrespective of any other
            circumstances. As such, once you give any Instruction, you have no right to rescind or
            withdraw such Instruction without our written consent. Your Instruction shall not be
            considered to be received by PAYTOSAVE LIMITED until it has been received by PAYTOSAVE
            LIMITED ’s server. Additionally, PAYTOSAVE LIMITED ’s records of all Instructions shall
            be conclusive and binding on you for all purposes.
          </>,
          <>
            <b>Your Identity Or Authority.</b> PAYTOSAVE LIMITED has no obligation to verify the
            identity or authority of any person giving any Instruction and the authenticity of such
            Instruction. Under no circumstances shall any of the Indemnified Persons be responsible
            or liable for any direct or indirect losses (including loss of profits, business or
            opportunities), damages, or costs suffered by you or any other person or entity, arising
            from any of the Indemnified Persons relying or acting upon any Instruction which is
            given or purported to be given by you, regardless of the circumstances prevailing at the
            time of such Instruction, the nature of the arrangement, services, or transaction made
            pursuant to such Instruction or the amount of money involved and notwithstanding any
            error, misunderstanding, fraud, forgery, lack of clarity, or authorization in the terms
            of such Instruction.
          </>,
          <>
            <b>Our Discretion.</b> You acknowledge and agree that PAYTOSAVE LIMITED may, in its sole
            and absolute discretion, refuse to act upon or defer acting upon any Instruction, or
            seek further information with respect to the Instruction. Under no circumstances shall
            any of the Indemnified Persons be responsible or liable for any direct or indirect
            losses (including loss of profits, business, or opportunities), damages, or costs
            suffered by you or any other person or entity, arising from or in connection with any of
            the Indemnified Persons’ refusal or delay in acting upon any Instruction.
          </>,
          <>
            <b>Notification Of Instructions.</b> PAYTOSAVE LIMITED may transmit, via electronic
            communication, a notification to you upon receipt of any deposit or withdrawal
            Instruction from you, or upon completion of such Instruction. All notifications are
            deemed received by you immediately upon such notification’s transmission. You must
            ensure that the details in any such notification are in accordance with your
            Instruction. You must contact us if you do not receive completion notifications.
          </>,
          <>
            <b>Credit/Debit Authorization.</b> You authorize PAYTOSAVE LIMITED to credit or debit
            (or provide settlement information to third parties for the purposes of the third-party
            crediting or debiting) your Digital Assets and/or fiat monies from your Account(s) in
            accordance with your Instruction. We reserve the right not to effect any Transaction if
            you have insufficient fiat monies or Digital Assets in your Account(s) (i.e. less than
            the required amount to settle the Transaction and to pay all the fees associated with
            the Transaction).
          </>,
        ]}
      />
      <Text className={styles.heading} color="darkDefault" variant="subtitle-2">
        Termination, Suspension, or Restriction
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        In our sole and absolute discretion, we may: (1) refuse to complete or block, cancel, or
        reverse any Transaction you have authorized or instructed; (2) terminate, suspend, or
        restrict your access to any or all of the Services; (3) terminate, suspend, or restrict your
        access to any or all of your Account(s); and/or (4) refuse to transmit information or
        Instructions to third parties (including but not limited to third-party wallet operators),
        in each case with immediate effect for any reason or no reason whatsoever, including,
        without limitation, where:
      </Text>
      <UlListComponent
        list={[
          'we are required to do so by applicable law or regulation, or any court or authority to which we are subject in any jurisdiction;',
          'we have determined or suspect that you have breached these Terms (including any other documents, materials or information incorporated by reference herein) or the Trading Rules;',
          'we have determined or suspect that any Transaction is unauthorized, erroneous, fraudulent, or unlawful or we have determined or suspect that your Account(s) or the Services are being used in a fraudulent, unauthorized, or unlawful manner;',
          'we have determined or suspect there is any occurrence of money laundering, terrorist financing, fraud, or any other crime;',
          'use of your Account(s) is subject to any pending or ongoing litigation, investigation, or judicial, governmental or regulatory proceedings and/or we perceive a heightened risk of legal or regulatory non-compliance associated with your Account(s) activity;',
          'you owe amounts to PAYTOSAVE LIMITED that are not satisfied, whether due to a chargeback or any other basis;',
          'an issue has arisen with the verification of your identity; and',
          'you have taken any action that may circumvent our controls such as opening multiple Accounts without our written consent or abusing promotions which we may offer from sÏtime to time.',
        ]}
      />
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        You acknowledge and agree that our decision to take certain actions, including, without
        limitations, to terminate, suspend, or restrict your access to your Account(s) or the
        Services, may be based on confidential criteria that are essential to our risk management
        and security protocols. You agree that we are under no obligation to disclose the details of
        our risk management and security procedures to you. Any chargeback resulting from the use of
        your Account(s) or Services may result in an immediate suspension and/or restriction of your
        Accounts(s) and Services. To reactivate suspended and/or restricted Account(s) and Services,
        you must reimburse PAYTOSAVE LIMITED for the full value of the chargeback. You are liable
        for any credited amounts in case of a chargeback, and you authorize and grant PAYTOSAVE
        LIMITED the right to deduct costs and fees directly from any assets in your Account(s)
        without notice. Under no circumstances shall any of the Indemnified Persons be responsible
        or liable for any direct or indirect losses (including loss of profits, business or
        opportunities), damages, or costs suffered by you or any other person or entity, due to any
        of the Indemnified Persons’ action or inaction in accordance with these Terms.
      </Text>
      <Text className={styles.heading} color="darkDefault" variant="subtitle-2">
        Representations And Warranties
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        You hereby represent and warrant to PAYTOSAVE LIMITED , at all times, the following:
      </Text>
      <UlListComponent
        list={[
          <>
            <b>Accuracy.</b> All documents and information you provide to PAYTOSAVE LIMITED are
            true, accurate, complete, and up-to- date in all respects, and may be relied upon by us
            in determining whether or not you are eligible to access the Platform or to utilize the
            Services.
          </>,
          <>
            <b>Authority.</b> You have full power, authority, and capacity to (1) access and use the
            Platform and/or the Services; and (2) enter into and deliver, and perform your
            obligations under, these Terms and any agreement entered into pursuant to, or in
            connection with, these Terms.
          </>,
          <>
            <b>Authorization.</b> All consents, permissions, authorizations, approvals and
            agreements of third parties and all authorizations, approvals, permissions, consents,
            registrations, declarations, filings with any regulatory authority, governmental
            department, commission, agency or other organization having jurisdiction over you which
            are necessary or desirable for you to obtain in order to (1) access and use the Platform
            and/or the Services and (2) enter into and deliver, and perform the transactions
            contemplated under these Terms and any agreement entered into pursuant to, or in
            connection with, these Terms, have been unconditionally obtained in writing, disclosed
            to us in writing, and have not been withdrawn or amended.
          </>,
          <>
            <b>Binding Contract.</b> These Terms and any agreement entered into pursuant to, or in
            connection with, these Terms constitute valid and legally binding obligations,
            enforceable against you in accordance with their respective terms.
          </>,
          <>
            <b>Incorporation.</b> If you are an entity, you are duly incorporated, duly organized,
            and validly existing under the laws of your jurisdiction and have full power to conduct
            your business. If you are an individual, you are not less than 18 years old.
          </>,
          <>
            <b>No Breach.</b> Your access and use of the Platform and/or the Services, your
            execution and delivery of, and the performance of your obligations under these Terms and
            any agreement entered into pursuant to, or in connection with, these Terms, will not:
            <UlListComponent
              list={[
                'if you are an entity, result in a breach of or conflict with any provision of your constitution (or equivalent constitutive documents);',
                'result in a breach of, or constitute a default under, any instrument, agreement, document or undertaking to which you are a party or by which you or any of your property is bound or subject; and',
                'result in a breach of any applicable laws, rules or regulations or of any order, decree or judgment of any court, any award of any arbitrator or those of any governmental or regulatory authority in any jurisdiction.',
              ]}
            />
          </>,
        ]}
      />
      <Text className={styles.heading} color="darkDefault" variant="subtitle-2">
        Liability
      </Text>
      <UlListComponent
        list={[
          <>
            <b>Indemnification.</b> You will indemnify and hold harmless PAYTOSAVE LIMITED , its
            affiliates and service providers, and each of their respective officers, directors,
            employees, affiliates, agents, licensors, and contractors (“Indemnified Persons”) from
            and against any claims, suits, actions, demands, disputes, allegations, or
            investigations brought by any third-party, governmental authority, or industry body, and
            all liabilities, damages (actual and consequential), losses, costs, and expenses,
            including without limitation reasonable attorneys’ fees, arising out of or in any way
            connected with (1) your access to or use of the Services; (2) your breach or alleged
            breach of these Terms or your violation of any other provision of these Terms, including
            any terms and conditions incorporated by reference herein; (3) your violation of any
            law, rule, or regulation; and (4) your violation of the rights of any third-party. We
            reserve the right to assume control of the defense of any third-party claim that is
            subject to indemnification by you, in which event you will cooperate with us in
            asserting any available defenses.
          </>,
          <>
            <b>Limitations Of Liability.</b> IN NO EVENT SHALL ANY OF THE INDEMNIFIED PERSONS BE
            LIABLE TO YOU OR ANY OTHER PERSON OR ENTITY FOR ANY LOSS OF BUSINESS, PROFITS OR
            OPPORTUNITIES, OR ANY SPECIAL, PUNITIVE, AGGRAVATED, INCIDENTAL, INDIRECT OR
            CONSEQUENTIAL LOSSES OR DAMAGES, WHETHER ARISING OUT OF OR IN CONNECTION WITH OUR SITES,
            THE PLATFORM, YOUR ACCOUNT(S), THE SERVICES, THESE TERMS, THE TRADING RULES, THE
            DISCLOSURES, THE PRIVACY POLICY, AND/OR ANY AGREEMENT ENTERED INTO PURSUANT TO, OR IN
            CONNECTION WITH, THESE TERMS OR OTHERWISE. OUR LIABILITY, AND THE LIABILITY OF THE
            INDEMNIFIED PERSONS, TO YOU OR ANY THIRD PARTIES IN ANY CIRCUMSTANCE IS LIMITED TO THE
            ACTUAL AMOUNT OF LOSS OR DAMAGE WHICH IS CAUSED DIRECTLY AND IS REASONABLY FORESEEABLE
            BY OUR BREACH OF THESE TERMS AND SHALL IN NO EVENT EXCEED $3,000. SUCH SUM SHALL BE PAID
            AS LIQUIDATED DAMAGES BY US TO YOU IN FULL AND FINAL SETTLEMENT AND SATISFACTION OF OUR
            ENTIRE LIABILITY AND THE INDEMNIFIED PERSONS’ ENTIRE LIABILITY FOR ANY LOSS OR DAMAGE
            WHICH IS CAUSED DIRECTLY AND IS REASONABLY FORESEEABLE BY OUR BREACH OF THESE TERMS. YOU
            ACKNOWLEDGE AND ACCEPT THAT DAMAGES ARE AN ADEQUATE REMEDY AND THAT YOU SHALL NOT BE
            ENTITLED TO ANY OTHER CLAIMS OR REMEDIES AT LAW OR IN EQUITY, INCLUDING BUT NOT LIMITED
            TO, ANY CLAIM IN REM, INJUNCTION, AND/OR SPECIFIC PERFORMANCE.
          </>,
          <>
            <b>No Warranty.</b> THE SERVICES ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS
            WITHOUT ANY REPRESENTATION OR WARRANTY, WHETHER EXPRESS OR IMPLIED, TO THE MAXIMUM
            EXTENT PERMITTED BY APPLICABLE LAW: SPECIFICALLY, WE DISCLAIM ANY IMPLIED WARRANTIES OF
            TITLE, MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND/OR NON-INFRINGEMENT. WE DO
            NOT MAKE ANY REPRESENTATIONS OR WARRANTIES THAT ACCESS TO THE SITES, THE PLATFORM, ANY
            OF YOUR ACCOUNT(S), THE SERVICES, OR ANY OF THE MATERIALS CONTAINED THEREIN, WILL BE
            CONTINUOUS, UNINTERRUPTED, TIMELY, OR ERROR-FREE. WE WILL MAKE REASONABLE EFFORTS TO
            ENSURE THAT TRANSACTIONS ON THE PLATFORM ARE PROCESSED IN A TIMELY MANNER, BUT WE MAKE
            NO REPRESENTATIONS OR WARRANTIES REGARDING THE AMOUNT OF TIME NEEDED TO COMPLETE
            PROCESSING WHICH IS DEPENDENT UPON MANY FACTORS OUTSIDE OF OUR CONTROL.
          </>,
          <>
            <b>Security.</b> Our Services support logins 2FA, which is known to reduce the risk of
            unauthorized use of or access to the Services. We will neither ask for you 2FA codes nor
            will our user support ask to screen share or otherwise seek access to your devices of
            Account(s). Always log into your Account(s) through the Sites to review any Transactions
            or required actions if you have any uncertainty regarding the authenticity of any
            communication or notice. PAYTOSAVE LIMITED is not liable for any damage or interruptions
            caused by any computer viruses, spyware, scareware, Trojan horses, worms, or other
            malware that may affect your computer or other equipment, or any phishing, spoofing, or
            other attack. We advise the regular use of a reputable and readily available virus
            screening and prevention software. You should also be aware that SMS and email services
            are vulnerable to spoofing and phishing attacks and should use care in reviewing
            messages purporting to originate from us. You are responsible for all login credentials,
            including usernames and passwords and must keep security details safe at all times.
          </>,
          <>
            <b>No Liability For Breach.</b> We are not liable for any breach of these Terms or any
            agreement entered into pursuant to, or in connection with, these Terms where the breach
            is due to abnormal and unforeseeable circumstances beyond our control, the consequences
            of which would have been unavoidable despite all effects to the contrary, nor are we
            liable where the breach is due to any action or inaction which is necessary or desirable
            in order to comply with any laws, rules, or regulations
          </>,
        ]}
      />
      <Text className={styles.heading} color="darkDefault" variant="subtitle-2">
        Data Protection
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        You acknowledge and agree that we may process personal data in relation to you. Please
        review our Privacy Policy for more information on how we collect and use data relating to
        the use and performance of our Sites and Services.
      </Text>
      <Text className={styles.heading} color="darkDefault" variant="subtitle-2">
        Intellectual Property
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        Unless otherwise indicated in these Terms, all copyright and other intellectual property
        rights in all information, data, text, images, links, sounds, graphics, videos, and other
        materials contained on our Sites or such other mode of access (including through the
        PAYTOSAVE LIMITED APIs) or provided in connection with the Services, including, without
        limitation, our logo and all designs, information, data, text, images, links, sounds,
        graphics, videos, other materials, and the selection and arrangement thereof (collectively,
        <b>“Materials”</b>) are PAYTOSAVE LIMITED ’s, it’s licensors, or suppliers property and are
        protected by U.S. and international copyright laws and other intellectual property rights
        laws. We hereby grant you a limited, nonexclusive, and nonsublicensable license to access
        and use the Materials for your non-commercial personal or internal business uses. Such
        license is subject to these Terms and does not permit (1) the resale of the Materials; (2)
        the distribution, public performance, or public display of any Materials; (3) the
        modification or derivative uses of the Materials; and (4) the use of the Materials other
        than for their intended purposes. The license granted under herein automatically terminates
        if we suspend or terminate your access to the Services.
      </Text>
      <Text className={styles.heading} color="darkDefault" variant="subtitle-2">
        Trademarks
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        The Trademarks, service marks, and logos (<b>“Trademarks”</b>) used and displayed on or
        through the Sites or the Services are registered and unregistered Trademarks of the relevant
        mark owners of PAYTOSAVE LIMITED and our licensors. Nothing on the Sites should be construed
        as granting, by implication, estoppel, or otherwise, any license or right to use, copy, or
        imitate, in whole or in part, any Trademark displayed on the Sites, without our written
        permission or that of other Trademark owners. We prohibit the use of the Trademarks, any
        entity name, trade name, company name of ours or any other Trademark owned by us as a “hot”
        link to any website unless establishment of such a link is approved in advance by us in
        writing.
      </Text>
      <Text className={styles.heading} color="darkDefault" variant="subtitle-2">
        Complaints
      </Text>
      <UlListComponent
        list={[
          <>
            <b>Filing A Complaint.</b> If you have a complaint, please state the cause of your
            complaint, how you would like us to resolve the complaint, and any other information you
            believe to be relevant, in the manner described on our Support page. Upon receiving your
            complaint, we will open a support ticket and a user complaints officer (
            <b>“Complaint Officer”</b>) will review your complaint. The Complaint Officer will
            review your complaint without prejudice, based on the information you provided and any
            information we may derive from our records. Within thirty business days ((all days
            excluding Saturday, Sundays, and any bank holiday in the State of California) (
            <b>“Business Days”</b>)) of our receipt of your complaint, the Complaint Officer will
            use reasonable efforts to address the points raised in your complaint and the Complaint
            Officer may: (1) offer to resolve your complaint in the way you have requested; (2)
            reject your complaint and set out the reasons for the rejection; or (3) offer to resolve
            your complaint with an alternative proposal or solution. In exceptional circumstances,
            if the Complaint Officer is unable to respond to your complaint within thirty Business
            Days, the Complaint Officer will use reasonable efforts to send you a holding response
            indicating the reasons for a delay in answering your complaint and specifying the
            deadline by which the Complaint Officer will respond to your complaint.
          </>,
          <>
            <b>Offers.</b> Any offer of resolution made to you will only become binding on PAYTOSAVE
            LIMITED if accepted by you. An offer of resolution will not constitute any admission by
            us of wrongdoing or liability regarding the complaint’s subject matter.
          </>,
        ]}
      />
      <Text className={styles.heading} color="darkDefault" variant="subtitle-2">
        General Terms
      </Text>
      <UlListComponent
        list={[
          <>
            <b>Sites Accuracy.</b> Although we intend to provide accurate and timely information on
            the Sites, the Sites may not always be entirely accurate, complete, or current and may
            also include technical inaccuracies or typographical errors. In an effort to continue to
            provide you with as complete and accurate information as possible, information may, to
            the extent permitted by applicable law, be changed or updated from time to time without
            notice, including without limitation information regarding our policies, agreements,
            products, and services. Accordingly, you should verify all information before relying on
            it, and all decisions based on information contained on the Sites are your sole
            responsibility and we shall have no liability for any such decisions. Links to
            third-party websites (including, without limitation, content, materials, and/or
            information in the third-party websites) may be provided as a convenience but they are
            not controlled by us. You acknowledge and agree that we are not responsible for any
            aspect of the content, materials, information or services contained in any third-party
            websites accessible or linked from the Sites.
          </>,
          <>
            <b>Export Controls And Sanctions.</b> Your use of the Services and Sites may be subject
            to international export controls and economic sanctions requirements. By trading Digital
            Assets on the Platform or accessing the Services, you agree that you will fully comply
            with any and all such requirements. You are not permitted to transact in Digital Assets
            or use any of the Services if (1) we are prohibited from providing Services to you under
            any applicable laws and regulations, including but not limited to the Trading with the
            Enemy Act, as amended, and each of the foreign assets control regulations of the U.S.
            Department of Treasury (31 C.F.R., Subtitle B, Chapter V, as amended) and any other
            enabling legislation or executive order relating thereto (<b>“Sanctions Laws”</b>) as
            amended, supplemented, or replaced from time to time; or (2) you intend to transact or
            deal with any person in breach of any of the Sanctions Laws. You represent and warrant
            to us that you, and to your knowledge, any of your directors, officers, or employees are
            not directly or indirectly owned or controlled by any person or entity currently
            included on the List of Specially Designated Nationals and Blocked Persons or the
            Foreign Sanctions Evaders List maintained by the U.S. Treasury Department’s Office of
            Foreign Assets Control, nor are directly or indirectly owned or controlled by any person
            or entity who is located, organized, or resident in a country or territory that is, or
            whose government currently is, the target of countrywide sanctions imposed by any U.S.
            government sanctions authority, including the U.S. Treasury Department’s Office of
            Foreign Assets Control.
          </>,
          <>
            <b>Amendments.</b> We may amend, supplement, and/or replace these Terms and any terms
            and conditions incorporated by reference, now or in the future, by posting on the
            Website or emailing to you the revised terms and conditions, and the revised terms and
            conditions shall be effective at such time. If you do not agree with any such amendment,
            supplement, or replacement of such terms and conditions, your sole and exclusive remedy
            is to terminate your use of the Services and close your Account(s).
          </>,
          <>
            <b>Relationship Of The Parties.</b> You acknowledge and agree that: (1) PAYTOSAVE
            LIMITED is not holding any fiat monies and/or Digital Assets as your trustee, and is not
            acting as your broker, intermediary, agent, trustee, advisor or in any fiduciary
            capacity; and (2) no communication or information provided to you by us shall be
            considered or construed as any form of advice.
          </>,
          <>
            <b>Privacy Of Others.</b> If you receive information about another use through the
            Platform or from utilizing our Services, you must keep the information confidential and
            only use it in connection with the Services and always in accordance with applicable
            laws and regulations. You must not disclose or distribute any user information to a
            third-party or use the information in any manner except as reasonably necessary to
            effect a Transaction.
          </>,
          <>
            <b>Email Security.</b> You shall keep the email account associated with your Account(s)
            (<b>“Email Account”</b>) secure against any attacks and unauthorized access. You are
            required to notify PAYTOSAVE LIMITED immediately if you have knowledge or have reason
            for suspecting that the security of your Email Account has been compromised or if there
            has been any unauthorized use of your Email Account. Under no circumstances shall any of
            the Indemnified Persons be responsible or liable for any direct or indirect losses
            (including loss of profits, business, or opportunities), damages or costs suffered by
            you or any person by reason of or arising from or as a consequence of any access
            (whether authorized or not) to your Email Account by any person, any breach of security
            of your Email Account, or any Transactions, Instructions, or operations effected by you
            or purported to be effected by you through your Email Account.
          </>,
          <>
            <b>Security Breach.</b> If you suspect that your Account(s) or any of your security
            details have been compromised or if you become aware of any fraud or attempted fraud or
            any other security incident (including a cyber-security attack) affecting you and/or
            PAYTOSAVE LIMITED (together a “<b>Security Breach”</b>), you must immediately lock your
            Account(s) via the disable account function on the Website or via any other method as
            may be prescribed by PAYTOSAVE LIMITED from time to time, contact our user support via
            our Support page, and continue to provide accurate and up to date information throughout
            the duration of the Security Breach. You must take any steps that we may reasonably
            require to reduce, manage, or report any Security Breach. Failure to provide prompt
            notification of any Security Breach may be considered in our determination of the
            appropriate resolution of the matter.
          </>,
          <>
            <b>Contact Information.</b> You are responsible for keeping your email address and other
            contact information up to date in your Account(s) in order to receive any notices or
            alerts that we may send you (including notices or alerts of an actual or suspected
            Security Breach).
          </>,
          <>
            <b>Taxes.</b> It is your responsibility to determine what, if any, taxes apply to the
            payments you make or receive, and it is your responsibility to collect, report, and
            remit the correct tax to the appropriate tax authority. PAYTOSAVE LIMITED is not
            responsible for determining whether any taxes apply to your Transaction, or for
            collecting, reporting or remitting any taxes arising from any Transaction. Please be
            advised that you may be subject to withholding taxes or other tax liabilities with
            respect to importing services from a foreign entity. In addition, you may be subject to
            goods and services tax (or its equivalent), sales tax, income tax, duties, or other tax
            liabilities as a seller of goods or services. It is your responsibility to check with
            your local tax advisor to determine which taxes apply to you, and it is your
            responsibility to pay such taxes to the appropriate tax authority. All fees relating to
            the Services are to be made free and clear of, and without any deduction or withholding
            for and on account of, any taxes, duties or other deductions. Any such deduction or
            withholding, if required by the laws of any country or taxation authority are your sole
            responsibility. If any such deduction or withholding is required to be made, you agree
            to increase the sum payable to PAYTOSAVE LIMITED to the extent necessary to ensure that
            PAYTOSAVE LIMITED receives the amount equal to the sum which would have been due to
            PAYTOSAVE LIMITED had no such deduction or withholding been required.
          </>,
          <>
            <b>Unclaimed Property.</b> If we hold your assets, and we are unable to contact you and
            have no record of your use of the Services for several years, applicable laws and
            regulations may require us to report our holdings of such fiat monies or Digital Assets
            as unclaimed property to the authorities in certain jurisdictions. We will try to locate
            you at the address shown in our records, but if we are unable to, we may be required to
            deliver any such fiat monies or Digital Assets to the authorities in certain
            jurisdictions as unclaimed property. We reserve the right to deduct a dormancy fee or
            other administrative charges in respect of such unclaimed monies or Digital Assets, as
            permitted by applicable laws and regulations.
          </>,
          <>
            <b>Entire Agreement.</b> These Terms (including any documents, materials, or information
            incorporated by reference herein) set forth the entire understanding between you and
            PAYTOSAVE LIMITED with respect to the Services.
          </>,
          <>
            <b>Clause Headings.</b> Clause headings in these Terms are for convenience only and
            shall not govern the meaning or interpretation of any provision of these Terms.
          </>,
          <>
            <b>Transfer.</b> These Terms (including any documents, materials, or information
            incorporated by reference herein) is personal to you and you are not permitted to
            novate, transfer or assign your rights, interests, liabilities, and/or obligations to
            anyone else without our prior written consent. However, you hereby acknowledge and agree
            that we shall have sole and absolute discretion to novate, transfer, or assign these
            terms (including any documents, materials or information incorporated by reference
            herein) or any of our rights, interests, liabilities, and/or obligations at any time to
            anyone else, including, without limitation, in connection with any merger, acquisition,
            or other corporate reorganization involving PAYTOSAVE LIMITED .
          </>,
          <>
            <b>Security Interests</b> Security Interests. You undertake not to create any security
            over your fiat monies or Digital Assets held in any of your Account(s) without our prior
            written consent.
          </>,
          <>
            <b>Invalidity.</b> If any provision of these Terms, terms and conditions or information
            incorporated by reference in these Terms is or becomes illegal, invalid, or
            unenforceable in any respect, the same shall not affect the legality, validity, or
            enforceability of any other provisions in these Terms.
          </>,
          <>
            <b>Enforcement Of Our Rights.</b> PAYTOSAVE LIMITED ’s rights and remedies under these
            Terms are cumulative and not exclusive of any rights or remedies provided by law or by
            any other agreement. Any failure or delay on the part of PAYTOSAVE LIMITED to exercise
            any right or remedy under these Terms shall not operate as a waiver of such right or
            remedy. Any single or partial exercise of any right or remedy shall not preclude any
            other or further exercise thereof or the exercise of any other right or remedy.
          </>,
          <>
            <b>Language.</b> These Terms may, at PAYTOSAVE LIMITED ’s sole and absolute discretion,
            be translated into a language other than the English language. You agree that any such
            translation shall only be for your convenience and the English text shall prevail in the
            event of any ambiguity, discrepancy or omission as between the English text and any
            translated text.
          </>,
          <>
            <b>Third-Party Rights.</b> Nothing expressed or referred to in these Terms will be
            construed to give any person other than the parties to these Terms any legal or
            equitable right, remedy, or claim under or with respect to these Terms or any provision
            of these Terms. These Terms and all of its provisions are for the sole and exclusive
            benefit of the parties to these Terms and their successors and permitted assigns.
          </>,
          <>
            <b>Survival.</b> All provisions of these Terms, which by their nature extend beyond the
            expiration or termination of these Terms, will continue to be binding and operate after
            the termination or expiration of these Terms.
          </>,
          <>
            <b>Governing Law And Jurisdiction.</b> These Terms shall be construed in accordance with
            and governed for all purposes by the laws and public policy of the State of California
            applicable to contracts executed and to be wholly performed within such state.
          </>,
        ]}
      />
      <Text className={styles.heading} color="darkDefault" variant="subtitle-2">
        Class Action Waiver
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="medium">
        TO THE EXTENT PERMITTED BY LAW, ALL CLAIMS MUST BE BROUGHT IN A PARTY’S INDIVIDUAL CAPACITY,
        AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS, COLLECTIVE ACTION, OR
        REPRESENTATIVE PROCEEDING. UNLESS BOTH YOU AND PAYTOSAVE LIMITED AGREE, NO ARBITRATOR OR
        JUDGE MAY CONSOLIDATE MORE THAN ONE PERSON’S CLAIMS OR ENGAGE IN ANY CLASS ARBITRATION. BY
        AGREEING TO THESE TERMS, YOU ACKNOWLEDGE THAT YOU AND PAYTOSAVE LIMITED EACH WAIVE THE RIGHT
        TO: (1) A JURY TRIAL; AND (2) PARTICIPATE IN A CLASS ACTION. IF A COURT DECIDES THAT
        APPLICABLE LAW PRECLUDES ENFORCEMENT OF ANY OF THIS PARAGRAPH’S LIMITATIONS AS TO A
        PARTICULAR CLAIM FOR RELIEF, THEN THAT CLAIM (AND ONLY THAT CLAIM) MUST BE SEVERED FROM THE
        ARBITRATION AND MAY BE BROUGHT IN COURT.
      </Text>
    </div>
  </div>
);

export default Terms;
