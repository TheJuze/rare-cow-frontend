/* eslint-disable max-len */
import React from 'react';
import { Text } from 'components';
import styles from './styles.module.scss';

const UlListComponent = ({ list }: { list: string[] }) => (
  <ul className={styles.listWrapper}>
    {list.map((el) => (
      <li className={styles.listColor} key={el}>
        <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
          {el}
        </Text>
      </li>
    ))}
  </ul>
);

// TODO: create element config with props
const PrivacyPolicy = () => (
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
      <Text className={styles.heading} color="darkDefault" variant="subtitle-2">
        CONFIDENTIALITY POLICY
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        Customers, Users, Users, Customer and employees andpersonnel of a Company incorporated in
        Seychelles on the 29 th day of April 2021, registration number 227963, and having its
        registered office at Suite 1, Second Floor, Sound & Vision House, Francis Rachel Str.,
        (hereinafter referred to as “the Company”)have a duty of maintaining the confidentiality of
        information received by them in the course of their employment or engagement. This
        Confidentiality Policy documents the confidentiality and non-disclosure duties and
        obligations of the Users, Customer andemployees and personnel of the Company.
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        TheCustomers,Users, Users, Customer and employees and personnel of PaytoSave Limited will,
        in the course of their employment and engagement, become aware of and possess information of
        the PaytoSave Limited orof third parties disclosed to the PaytoSave Limited that is not
        generally known. This may include information which if disclosed could jeopardise the
        interests of the PaytoSave Limited . It may also include commercial trade secrets disclosure
        of which could harm the interests of the PaytoSave Limited .
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        All USERS Customers Users, Customer and employees and personnel of the PaytoSave Limited
        have a duty to keep such information strictly confidential and to use it only for the proper
        purposes in accordance with the law;
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="bold">
        PaytoSave has been committed to maintaining the security of User entrusted funds, and has
        implemented industry standard protection for Paytosafe Services. However, the actions of
        individual Users may pose risks. You shall agree to treat your access credentials (such as
        username and password) as confidential information, and not to disclose such information to
        any third party. You also agree to be solely responsible for taking the necessary security
        measures to protect your Paytosave Account and personal information placed on the Platform{' '}
        <a className={styles.link} href={window.location.host} target="_blank" rel="noreferrer">
          {window.location.host}
        </a>
      </Text>
      <Text className={styles.heading} color="darkDefault" variant="subtitle-2">
        1. PURPOSE
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        The purpose of this Confidentiality Policy is to lay down the principles that must be
        observed by all who work with the PaytoSave Limited and have access to confidential
        information.
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        This policy, where relevant, should be read in conjunction with the appointment letter
        and/or employment contract applicable to PaytoSave Limited employees and personnel, and
        other work rules, policies and procedures applicable to PaytoSave Limited employees and
        personnel.
      </Text>
      <Text className={styles.heading} color="darkDefault" variant="subtitle-2">
        2. CONFIDENTIAL INFORMATION
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        Confidential information includes any information which is not publicly known. It can
        concern technology, business, finance, transaction or other affairs of a company. It
        includes information which is commercially valuable such as trade secrets or business
        information, as well as personal information
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        Examples of confidential information include but are not limited to: any document,
        discovery, invention, improvement, patent specification, formulations, plans, ideas, books,
        accounts, data, reports, drafts of documents of all kinds, correspondence, client
        information, lists and files, decisions, information about employees, strategies, drawings,
        recommendations, designs, office precedents, policies and procedures, budget and financial
        information in any form, i.e. physical, electronic, electromagnetic or otherwise.
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        Confidential information to do with unpublished inventions can be particularly sensitive.
        Disclosure of an invention before a patent application is filed will cause irreversible loss
        of intellectual property rights to the owner of the invention. Even after a patent
        application is filed, care must be taken not to disclose improvements to the invention.
        Trade secret protection will also be lost through open disclosure of the secret.
      </Text>
      <Text className={styles.text} color="darkDefault" variant="subtitle-2">
        3. PRINCIPLES
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        PaytoSave Limited expects all of its employees and personnel to handle all confidential
        information in a sensitive and professional manner. PaytoSave Limited employees and
        personnel are under an obligation not to gain access or attempt to gain access to
        information which they are not authorised to have. The PaytoSave Limited , however,
        recognises the importance of an open culture with clear communication and accountability.
        The PaytoSave Limited wishes to maintain personal and organisational safety and expects all
        employees and personnel to handle confidential information in a way which protects
        organisational security.
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        The purpose of confidentiality is essentially two fold. Firstly it protects sensitive or
        confidential information of the PaytoSave Limited and its clients and customers. Secondly,
        in order for the PaytoSave Limited to be effective, PaytoSave Limited employees and
        personnel must be able to share information and knowledge, and therefore confidentiality is
        necessary as a condition of trust.
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        The best protection against breaches in confidentiality is to keep the number of employees
        and personnel who have access to sensitive information to a necessary minimum.
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        Intentional, repeated, accidental, or unauthorised disclosure of any confidential
        information by any member of staff will be subject to disciplinary action. Any such
        disciplinary action will take account of the confidential and possible sensitive nature of
        the information and will make sure that in dealing with it, no further breaches of
        confidentiality take place.
      </Text>
      <Text className={styles.heading} color="darkDefault" variant="subtitle-2">
        4. MAINTENANCE OF CONFIDENTIALITY and NON-DISCLOSURE
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        PaytoSave Limited employees and personnel:
      </Text>
      <UlListComponent
        list={[
          'must keep confidential all confidential information;',
          'may use confidential information solely for the purposes of performing their duties as an employee of the PaytoSave Limited ;',
          'may only disclose confidential information to persons who are aware that the confidential information must be kept confidential and who have a need to know (but only to the extent that each person has a need to know)',
          'The employee’s and personnel’s obligation of maintaining confidentiality and non- disclosure does not extend to confidential information that is required to be disclosed by the employee pursuant to an order of a Court or any statutory authority. The employee or person will promptly notify the Company of any such requirement to enable the Company to take necessary action as deemed fit by the Company in the circumstances.',
        ]}
      />
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        At the end of the period of employment, PaytoSave Limited employees and personnel must
        return to the PaytoSave Limited :
      </Text>
      <UlListComponent
        list={[
          'all confidential information in material form;',
          'those parts of all notes and other records in whatsoever form, based on or incorporating confidential information;',
          'all copies of confidential information and notes and other records based on or incorporating confidential information; ',
          'all of PaytoSave Limited property and assets,',
          'in the possession or control of the PaytoSave Limited employee or personnel.',
        ]}
      />
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        The obligation of maintaining confidentiality and non-disclosure will continue even after
        the end of the period of employment or engagement in respect of all confidential
        information.
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        Any employee found to be in breach of this confidentiality and non-disclosure obligation,
        whilst employed by the PaytoSave Limited will be disciplined, and in serious instances,
        dismissed. Any ex-employee found to be in breach of this confidentiality obligation may be
        subject to legal action being taken against them, dependent upon the circumstances of the
        breach, including cancellation / withdrawal of any or all benefits if extended to the
        ex-employee by the Company.
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        This policy will operate in conjunction with the contract of employment or letter of
        appointment for PaytoSave Limited employees and personnel.
      </Text>
      <Text className={styles.heading} color="darkDefault" variant="subtitle-2">
        5. NEED TO KNOW
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        Confidential information is only to be disclosed on a &quot;need to know&quot; basis, only
        when the information is necessary to the employee for performing his or her employment
        duties effectively.
      </Text>
      <Text color="darkDefault" variant="subtitle-2">
        6. CIRCUMSTANCES IN WHICH INFORMATION CAN BE DISCLOSED
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        With the written consent of his/her reporting superior of not lower than Tier 4 and for a
        particular purpose
      </Text>
      <UlListComponent
        list={[
          'If the information is required by or under a Court order or of a statutory authority, the employee or person will promptly notify the Company of any such requirement to enable the Company to take necessary action as deemed fit by the Company in the circumstances.',
          'Where disclosure can be justified for any other purpose. This is usually for the protection of the public and is likely to be in relation to the prevention and detection of serious crime. A request for information by the police must be carefully considered.',
        ]}
      />
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        The PaytoSave Limited employee must be able to justify any decision when information has
        been disclosed.
      </Text>
      <Text className={styles.heading} color="darkDefault" variant="subtitle-2">
        7. STORAGE OF DATA
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        No written document containing confidential information must be left visible where it can be
        read by anyone. This includes telephone messages, computer prints, letters and other
        documents. All hardware containing confidential information must be housed in a secure
        environment. Security precautions must be taken in accordance with the PaytoSave Limited
        Policy and Procedures.
      </Text>
      <Text className={styles.heading} color="darkDefault" variant="subtitle-2">
        8. THE MEDIA
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        Confidential information must not be passed on to members of the press, or other media
        communications without the written consent of his reporting superior of not lower than Tier
        4 and for a particular purpose. All requests from the media must be dealt with under the
        PaytoSave Limited ’s procedure for handling media queries.
      </Text>
      <Text className={styles.heading} color="darkDefault" variant="subtitle-2">
        9. DISPOSAL OF INFORMATION
      </Text>
      <Text className={styles.text} color="darkDefault" variant="body-2" weight="normal">
        All media containing confidential information must be disposed off in a manner that ensures
        that information is not disclosed to an unauthorised person.
      </Text>
    </div>
  </div>
);

export default PrivacyPolicy;
