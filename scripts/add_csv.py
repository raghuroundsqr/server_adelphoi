import csv
from server_adelphoi.FirstMatch.models import ModelTests
def run():
    header2 = ['ClientCode', 'DoB', 'EpisodeStart', 'EpisodeEnd', 'EpisodeNumber',
       'AgeAtEpisodeStart', 'AgeAtEpisodeEnd', 'EpisodeLengthYrs',
       'EpisodeLengthMo', 'Gender', 'PrimaryRacecode', 'SecondaryRaceCode',
       'PrimaryLanguage', 'LS_Type', 'CYF_code', 'IncarceratedParent',
       'EnrollStart', 'EnrollEnd', 'EnrollmentStatus', 'LastE2rollme2t',
       'AgeAtEnrollStart', 'AgeAtEnrollEnd', 'EnrollDuration_Days', 'Program',
       'Location', 'Level_of_Care', 'FacilityType', 'RefSourceCode',
       'DischargeScreen', 'ClientDischarge', 'ProgramCompletion',
       'ReturntoCare_c', 'ClientDx', 'Permanency Plan \n(if <18)',
       'Borderline IQ (below 70)', 'Number of foster care placements',
       'Number of prior placements \n(excluding shelter and detention)',
       'Number of prior treatment terminations (excluding shelter or detention)',
       'Length of time since living at home', 'Termination directly to AV',
       'Level of care of previous termination', 'Family support',
       'Level of aggression', 'Fire setting', 'Client self-harm',
       'Abuse, or neglect', 'CANS_LifeFunctioning', 'CANS_YouthStrengths',
       'CANS_CareGiverStrengths', 'CANS_Culture', 'CANS_YouthBehavior',
       'CANS_YouthRisk', 'CANS_Trauma_Exp', 'FAST_FamilyTogetherScore',
       'FAST_CaregiverAdvocacyScore', 'YLS_PriorCurrentOffenses_Score',
       'YLS_FamCircumstances_Score', 'YLS_Edu_Employ_Score', 'YLS_Peer_Score',
       'YLS_Subab_Score', 'YLS_Leisure_Score', 'YLS_Personality_Score',
       'YLS_Attitude_Score', 'Screening tool for Trauma--Total score',
       'Death Caregiver', 'Death Silblings', 'Alcohol Use', 'Drug Use',
       'Type of drugs listed', 'English as the second language',
       'Incarcerated caregivers', 'Incarcerated siblings',
       'Number of prior AWOLS', 'Animal cruelty', 'Hist of prior program SAO',
       'Number of prior hospitalizations', 'Compliant with medication',
       'Significant mental health symptoms', 'Severe mental health symptoms',
       'Autism Diagnosis', 'Borderline Personality', 'Psychosis',
       'Reactive Attachment Disorder', 'Schizophrenia']

    csvfile = open(r'C:/Users/Raghu/Downloads/698_Raw_csv.csv', 'r')
    reader = csv.DictReader(csvfile)
    for each in reader:
        row = {}
        for field in header2:
            if each[field] in (None,'NULL','na','na ','NA','n/a','unable to determine ','1+',"",' ','NA '):
                each[field] =0
            row[field] = each[field]
        ModelTests(episode_start=row['EpisodeStart'], episode_number=row['EpisodeNumber'], client_code=row['ClientCode'],
                 dob=row['DoB'], \
                 gender=row['Gender'], primary_language=row['PrimaryLanguage'], RefSourceCode=row['RefSourceCode'], \
                 ls_type=row['LS_Type'], CYF_code=row['CYF_code'],
                 number_of_prior_placements=row['Number of prior placements \n(excluding shelter and detention)'], \
                 number_of_foster_care_placements=row['Number of foster care placements'],
                 number_of_prior_AWOLS=row['Number of prior AWOLS'], \
                 number_of_prior_treatment_terminations=row[
                     'Number of prior treatment terminations (excluding shelter or detention)'], \
                 termination_directly_to_AV=row['Termination directly to AV'],
                 length_of_time_since_living_at_home=row['Length of time since living at home'], \
                 hist_of_prior_program_SAO=row['Hist of prior program SAO'],
                 borderline_Personality=row['Borderline Personality'], \
                 reactive_Attachment_Disorder=row['Reactive Attachment Disorder'], animal_cruelty=row['Animal cruelty'],
                 schizophrenia=row['Schizophrenia'], \
                 psychosis=row['Psychosis'], borderline_IQ=row['Borderline IQ (below 70)'],
                 significant_mental_health_symptoms=row['Significant mental health symptoms'], \
                 prior_hospitalizations=row['Number of prior hospitalizations'],
                 severe_mental_health_symptoms=row['Severe mental health symptoms'], \
                 compliant_with_meds=row['Compliant with medication'],
                 incarcerated_caregivers=row['Incarcerated caregivers'], death_Caregiver=row['Death Caregiver'],\
                 incarcerated_siblings=row['Incarcerated siblings'], death_Silblings=row['Death Silblings'],
                 alcohol_Use=row['Alcohol Use'], \
                 drug_Use=row['Drug Use'], abuse_neglect=row['Abuse, or neglect'],
                 yls_FamCircumstances_Score=row['YLS_FamCircumstances_Score'], \
                 yls_Edu_Employ_Score=row['YLS_Edu_Employ_Score'], yls_Peer_Score=row['YLS_Peer_Score'],
                 yls_Subab_Score=row['YLS_Subab_Score'], \
                 yls_Leisure_Score=row['YLS_Leisure_Score'], yls_Personality_Score=row['YLS_Personality_Score'],
                 yls_Attitude_Score=row['YLS_Attitude_Score'], \
                 yls_PriorCurrentOffenses_Score=row['YLS_PriorCurrentOffenses_Score'],
                 family_support=row['Family support'], fire_setting=row['Fire setting'], \
                 level_of_aggression=row['Level of aggression'], client_self_harm=row['Client self-harm'],
                 Screening_tool_Trauma=row['Screening tool for Trauma--Total score'], \
                 cans_LifeFunctioning=row['CANS_LifeFunctioning'], cans_YouthStrengths=row['CANS_YouthStrengths'],
                 cans_CareGiverStrengths=row['CANS_CareGiverStrengths'], \
                 cans_Culture=row['CANS_Culture'], cans_YouthBehavior=row['CANS_YouthBehavior'],
                 cans_YouthRisk=row['CANS_YouthRisk'], cans_Trauma_Exp=row['CANS_Trauma_Exp'], \
                 ageAtEpisodeStart=row['AgeAtEpisodeStart'],enrollStart_date=row['EnrollStart'],
                ageAtEnrollStart=row['AgeAtEnrollStart'],
                 type_of_drugs=row['Type of drugs listed'], FAST_FamilyTogetherScore=row['FAST_FamilyTogetherScore'],
                 FAST_CaregiverAdvocacyScore=row['FAST_CaregiverAdvocacyScore'], \
                 Program_Completion=row['ProgramCompletion'], Returned_to_Care=row['ReturntoCare_c'],
                 level_of_care=row['Level_of_Care'], program=row['Program'], facility_type=row['FacilityType']).save()