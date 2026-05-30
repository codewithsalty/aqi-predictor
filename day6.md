Technical Sync-Up - Data Sciences
More options

Salman Khan
May 22 at 4:01 pm
31 min

5 screenshots

copy summary
 Shared with: 10p
Summary
Transcript

Template:
General
Overview
More options
The meeting focused on technical issues and project updates for the Data Sciences cohort. Key points included the final evaluation timing, which is after project submission unless submitted early. Haris Ahmad Khan discussed using OpenWeather API for pollutant data and transforming data for regression problems. Muhammad Affan Mushahid inquired about multiple model training and overfitting, with suggestions to use dynamic evaluation. The discussion also covered UI deployment, using OpenMeteo for data, and handling AQI predictions. Participants were advised to complete their projects, including UI and report details, and to prepare for evaluations, which will involve a brief presentation and project review.


Topic headlines

Bullet point

Longer


Action Items
More options
This list can be reordered. To drag an action item, press space or enter on the drag handle. Use the up and down arrow keys to move the action item. To drop the item, press space or enter again. To cancel drag and drop, press escape.


Train at least three different regression models (for example, Random Forest, Gradient Boosting, XGBoost, Support Vector Regressor, and Ridge Regression) for the AQI prediction task and avoid always selecting Ridge Regression as the best model; instead, choose the model that performs best on continuous evaluation metrics.







Send the completed project repository to the instructor for early evaluation before the final submission deadline, if it is ready early.







Use AI tools to help fill in the technical details of the project report, including how AI was used to solve specific problems, and include a dedicated section describing that usage.







Implement a simple UI or dashboard that displays the predicted AQI for the next three days and includes an alert when the AQI is classified as hazardous.







Add comments to the project files and deploy the completed automation pipeline on Streamlit, then finalize the project report and UI.







Relay the reported quiz portal issues (such as only seeing one quiz and unclear due dates) to the person managing the portal and follow up so that the problems are resolved.







If the quiz portal problems continue, consider discarding the current quiz set and replacing it with a new quiz set.







Review the entire data pipeline and AI-generated preprocessing scripts for the air quality project, and self-review the code to identify and fix any data leakage or overfitting issues that may be causing an R² score of 1.







Use Open Meteo or a similar weather API to fetch weather data for the AQI prediction project, instead of relying solely on Hopsworks, and append the data to the feature store without duplicating rows.






Add action item

Outline
More options
Discussion on Project Submission and Evaluation Timeline


•
Speaker 1 initiates the meeting, asking everyone to join and continues from the last week's discussion.


•
Speaker 3 inquires about the final evaluation timing, whether it is after project submission or in early June.


•
Speaker 1 clarifies that the final evaluation is after project submission, but it can be done earlier if the project is submitted early.


•
Speaker 4 asks about pushing changes to GitHub, and Speaker 1 confirms that no changes are allowed after the deadline.


Issues with Quizzes and Model Dependencies


•
Haris Ahmad Khan raises a question about using CSV files and different APIs, mentioning his model's dependency on pollutant values from OpenWeather.


•
Speaker 1 suggests using OpenMeteo instead of OpenWeather and transforming data into regression problem values.


•
Haris Ahmad Khan asks for clarification on future pollutant predictions, and Speaker 1 advises using regression techniques.


•
Speaker 5 asks about data cleaning and overfitting, and Speaker 1 advises verifying pre-processing scripts and checking for data leakage.


Multiple Model Training and Overfitting Concerns


•
Muhammad Affan Mushahid asks about using multiple models like Random Forest, Gradient Boosting, XGBoost, and Ridge Regression.


•
Speaker 1 advises not to show Ridge Regression as the best model continuously and suggests dynamic evaluation.


•
Muhammad Affan Mushahid mentions Ridge Regression as the best model but expresses concerns about overfitting.


•
Speaker 1 suggests early project submission for feedback and dynamic model evaluation.


UI Deployment and Data Collection


•
Speaker 6 asks about the mandatory use of Streamlet for UI deployment, and Speaker 1 clarifies that it is not mandatory but recommended.


•
Speaker 1 advises using OpenWeather for data collection and mentions issues with HopsWork.


•
Speaker 7 asks about the final submission requirements, and Speaker 1 advises including code, reports, and problems faced.


•
Speaker 8 inquires about the best regression models, and Speaker 1 confirms the correct values based on the last cohort.


Handling AQI and Fraud Detection


•
Speaker 3 asks about handling AQI as a regression or classification problem, and Speaker 1 advises using OpenWeather for classification.


•
Speaker 3 mentions using AUC-ROC scores for fraud detection, and Speaker 1 suggests it as a bonus task.


•
Haris Ahmad Khan asks about using OpenWeather for classification, and Speaker 1 advises against it but suggests OpenMeteo.


•
Speaker 1 confirms the need to train at least three models and mentions the evaluation process.


Project Updates and Evaluation Process


•
Speaker 1 asks for project updates, and Speaker 4 mentions using PyTorch and TensorFlow.


•
Speaker 10 confirms the project is almost complete, with automation running smoothly.


•
Speaker 1 advises completing the UI and adding comments to the files.


•
Speaker 3 asks about dockerizing the application, and Speaker 1 confirms it is not necessary.


Final Clarifications and Conclusion


•
Speaker 1 explains the evaluation process, including a call for 10-15 minutes to discuss the project and answer questions.


•
Speaker 1 mentions the evaluation criteria and the possibility of passing instantly.


•
Speaker 1 advises using PowerPoint presentations for the evaluation and communicates the date for the presentation.


•
The meeting concludes with no further questions from the participants.


Technical Sync-Up - Data Sciences
More options

Salman Khan
May 22 at 4:01 pm
31 min

5 screenshots

copy summary
 Shared with: 10p
Summary
Transcript

Edit Transcript
Keywords
project submission, final evaluation, CSV files, APIs, quizzes, GitHub, data leakage, overfitting, regression problem, classification problem, UI deployment, Streamlet, OpenWeather, Hopswork, evaluation process
Speakers
Speaker 1 (59%), Haris (11%), Muhammad (8%), Speaker 2 (5%), Speaker 3 (4%), Speaker 4 (3%), Speaker 5 (3%), Speaker 6 (2%), Speaker 7 (2%), Speaker 8 (1%), Speaker 9 (1%), Speaker 10 (<1%), Speaker 11 (<1%)
Let's give everyone five minutes to join
I
Okay, everyone. Hope you're doing great this week, and let's continue where we left off last week. A lot of you guys, common questions regarding, should we use CSV files? There are different APIs, which APIs we should move to. So, I believe those were answered before we start off the session. I wanted to know, okay, are you guys still facing some issues regarding the quizzes on the portal, because as much complaints, the animal I just need to know from you guys. Yeah, just shoot.
Yeah,
sir.
When I are
we final?
If you can background, okay, RF, you can just fix your webcam. Sure,
okay, sir. When are we going to have a final evaluation? Like, is it after project submission, or is it going to be in the, like, in the start of June,
it's after the project submission, like in a special cases, and they submit the project early, then we can do in the final week before submission as well.
Assalamu alaikum, sir. Sir, pass by the paper, he
Deadline, you're not allowed to push any changes to GitHub.
Yes, daily training.
Yeah,
okay. Thank you.
Yes, my question is related. This
should be more than one quiz. Like in, like, after submission, I
projects related to basically many Puri pipeline banalia with project ho gamma but the issue is ko mera model hai wo depend kar ray on like the pollutant values jo weather use karana to jo un key forecasted pollutant values which account intuitive a que botho model, basically basic mathematical equation core replicate forecasting new year, so vacation problem that UK open weather may patch classes. Casting weather historical weather data pollutant data
First of all, if open weather say up to say features email just 10, then you can try using Open Meteor coffee in transit. Continue karen, that should be the best approach as well. Secondly, agar aap niks ko de regression problem treat karna, so you can transform your data in a way. Ke up with the one to five classes on go, you trans you transform them into the values of different different APIs return from 100 to 500 logic to transform the data from one to five classes to 100 100 to 500 values. Then you can treat it as a regression problem, and a ski output be similar to buggy students schedule problems, so you can, you can try something like that.
Just a last question, make a period, Joe, hey, future pollutants, a prediction model, forecasting new, yeah, thank Thank you,
sir. I have a question.
Yeah, please, sir.
Mere pass Joe Meil cleaning radio data to over fitting, or get data.
Yeah, it's common data fetch. There might be some data leakage happening, and excuse us, say you might be over fitting your model, so just make sure. Also, I'm not stopping anyone from using anyone from using AI tools. Just make sure to verify up key pre-processing scripts and everything. They're working as intended. And KCB part, maybe data leakage now audio. You shouldn't be getting asked earlier for
I hope
that answers your question.
I'm not sure specific implementation, but if you're getting an R square value of one, then that definitely means step a model over fit color. So, what I would say is, one by one, thoroughly go through your pipeline job and generate key video, and try to review the attacker. Self-review if you're struggling with reviewing yourself, then make all swap AI key help place there, and AI will definitely point you to the correct direction. But if you're still facing an issue, then up next GitHub repository module, try to look over the weekend, probably. If I see something, I won't give a direct answer, but I will say you should try looking at this place.
Yes, Muhammad Affan Mehra B.C. Sawatak, I just want to see K Man and Multiple Model Strain Killer Shah Chatham and send Yad Random Forest Gradient Boost XI XG. XG boost or support vector regressor yet a ligand Joe mera best model rich regression and was me, that because it seems model train kind of at the end rigid regression, you up to best model Monday so a meratha training testing data to luck to Niragi, which overfit or a or many AI safety engineering overfitting area is a rigid regression of the best model bundle
I yeah, beach, me, I guess, man, internet, but if you're just training one model up, come multiple models. Could you repeat the question?
Basically, met was multiple models when it train came as my random forest regression, gradient boosting, XD boost, or support vector regressor or ridge regression. Now my issue is KJ Ridge regression. It is giving me the best training and testing R square, which is not one one to nearly can mess up me, but ridge regression still made a best model band right. So, yeah, that get multiple models and complicated models and licking sub me and me, okay? Ridge regression overfitting feature engineering key ways, ni up a rigid regression best fit up.
Yeah, then this shouldn't be an issue case, especially abnormally high value, then that's all right. Just job dashboard, just make sure you're always not showing rich regression model as the best model, like continuous evaluation or yogis. Egg, then rigid regression, as it like a next day, if you're training a different model, and if that's meeting, if that's meeting risk regression, then you should show your next three day prediction through that. There should be a little dynamic.
Yes. I think it's not now.
That's that still suggests some overfitting. Just try, okay? Jinnang, Jaldi project. Oh, yeah, you guys can send, can send it to me for early edition. I'm not guaranteeing that's because there are so many interns, but since you guys are done with it early, you might be able to get some early feedback, and
okay, so bus, I guess he jellys a car key upset evaluation get the exact onion,
yes. better.
Say,
yep,
repository, then your streamlet deploy,
yeah, streamline isn't mandatory, like UI, but Streamlet isn't mandatory, but traffic only is from the data size domain to just make and stream it, but last quote my people did also make through through react, etc. So, yeah, feel free to use that as well. Yeah, Muhammad, you posted a question. If AQA policy categories may other than, yeah, you can treat them classes one to five. There shouldn't be an issue. Also, if I think last week you mentioned, if anyone's facing issues with Hops work, then you can move towards Tagh. There shouldn't be an issue with that, and Hops work Nikhat issues. I'm still seeing a lot of people complaining. I hope many apps are okay. Respond, Kathryn, to the queries on Discord. I'm sorry I got back to you guys late, but there were.. there was a huge volume of queries. Yes, SNLI,
sir. Am I audible, sir?
Yes, you're audible.
Question, basically, how many others be live DNA, sir? Okay, how many do others in a and me is my requirements alert for her does equal levels.
I couldn't really understand that up to your final submission currently. Yeah, was my up to predict khan aqf the next three days in your city, and I grab submission ke baat khan submission may you should include your code, your report, and report can specifically up co but on what was the biggest problem that you faced and how you solve them and just guideline any up and put a process key
okay this may sir alerts belike
alert I guess this general stone medical prediction may show. Okay, this is the AQI for the next three day, and I grab UI coach. And then you can just say, okay, okay, the next three day QI is dangerous. So classify gets abnormally high, and it's like it was like clean cheese and car sector on the UI.
Okay, sir. Thank you so much.
Yes,
sir. When I question, you take a minute in charter regression models sooner check. Evaluate to hospital best for
That's okay, sounds about according to the last cohort, this should be right about the correct value.
Okay? Like stream lead page UI dashboard type. Okay. Thank
you. Yeah, I have one more thing. Up long key evaluation, ideally, but the evaluator up, and maybe probably check on a chat, and sometimes if everything's working as intended. So, in that case, up to UIB deployed on a child. Yes, welcome, Sam
would do hourly data collector Nikhat scriptli mujhe weather credit, and he data to serve NFA AI tools. You can
slogan open weather, because I would still suggest the output, you may take them. I prefer seeing values from 100 to 500 Joe Open Meteor, they say APIs provide karthan Jin. Okay, onsar, I must live over here, and they're really struggling in that side. So, as a last thought, I recommend them to use Open Weather. So, if you can try using Open Meteo and those those APIs for this,
or question you did mention, and back your quizzes, killing, he mentioned,
okay,
um, I'll note that down, the portal, and everything is being managed by someone else, so let me see.
Thank you,
sir. Is this first day, first quiz, Kelly due date mentioned, and okay,
so last
we can only see one quiz,
okay? So some of you can see on the one quiz, while others go back a question, but due date, you mentioned, okay, I'll relay this also. Don't worry too much about the quizzes when last week, because if the problems continue, then I'll probably discard them, but still that does not mean capital quizzes me. Make sure to give your all and try to complete the quizzes. Is she another up? Question answer? Okay.
Yes, sir. Thank you.
Okay. Yep. Shobfar.
Okay, sir, AQI bucket to handling like if it is a regression problem to AQI bucket, like runtime, or if it is a classification problem to AQI bucket, like API, so if it is a regression problem, so I think a QI bucket, am I actually,
yeah, yeah, up concept API use current for your problem,
open well,
open rather, yeah, I'm not really sure about the bucket, will apart job get
the UI bucket, if it is hazardous.
Yeah, the alert will apart, I think, without some misread. Okay, you just have to prediction for your APIs happening classes, good, moderate, bad prediction for next day. It's hazardous, or if it's not hazardous, like you don't have to go deeper,
and so if it is failing, like hazardous proof data analysis for fraud detection AUC IOC score, yeah.
If you, if you can do that, then I suggest to, but it's not a hard requirement for as a bonus. You can do that. Okay. Yes. Hammad Khan, do you have a question, do Okay, you don't have a question.
Faiqa Rashid.
Yep,
sir. Mera Johai Hopswork company open me to use care to accept acceptable
apne Hops work open meteor use. Here, okay, Hops work is a feature store. You probably use another feature store instead of Hops work, something you can use this DAG sub open materials for getting getting the weather data. Okay, so yeah, Agra Nikhara, you can use MongoDB or DEX helps keep permission anything.
Okay, take care. Echo Chaseman, opportunity Hamara e deploy can allows me,
yeah, the UI deploy can allows me, so someone else can access it and check.
Okay. Thank you.
Thank you. Yes. Sorry,
sir. Mujiba three clarification. Say it. So, if we. if, for example, I was using open weather to us, may as agar hummu as a classification problem was called treat correct, so will be acceptable. Hannah, it doesn't have to be a regression. Yep, classes go regression can the convert kar kefir regression get through school soft current UK document regression mentioned.
Yeah, but yeah, classification problem shouldn't be an issue. Sorry, question in the middle as well. So, can you repeat that?
Yes, sir. Mostly answer that, because I have already have a backfill from open weather of pollutant data to make a sector came open media say would see time frame ka weather data lake or apne feature store may append kar to basically roast ke
saath yeah just make sure up repeatedly append Nikhat because that's something so common the commonly when they can go but they and excuse us if they run into outfitting the model like same row bar will repeat over your team in the feature store.
Okay. Okay. Thank you, sir.
Okay. Is anyone complete with the project? Is point the last cohorts? I did realize coffee long. Yes, Muhammad Sabi, I okay, we can move to the fun part. Zampy, my random long economy. Try to ask for your updates, because Kush log always mentioned Nikhar, the issues they run into, and, and Mija, they try to ask the questions. Yes, Nikhil, are you, is your project going good? Any problems
apart, Raghun? Okay,
the UI deployment,
right?
Someone mentioned, can they use.. do they have to train three models? So, yes, you have to train at least three models, you are allowed to do that as well.
Sir, project Kelly PyTorch, yeah. TensorFlow may 2 flow, he used to I
Yes, Harun Rashid Project.
My project is almost complete. I just have to add comments in the files and deploy the project on stream. It then that everything is done, the automation is done, and the files and the scripts have been running pretty good for the past two weeks, I guess.
Okay, yeah. Try to complete the UI as well. Tried working extensively on your report to upke project time, pick with blockers any problems that you faced, try to highlight them, because reports go coffee dog under value, cut, and then I try to look at them more thoroughly.
Okay,
sorry, report, kill. AI use card sector,
you can, you can use AI, and to fill the technical details, like in, I would say there is a part to AI replicate Nikharsakta, and that's how you solve certain problems in the project, so try to have a dedicated section like how, if you, if you understand that,
and answer PowerPoint presentation,
PowerPoint presentation, you don't really have to submit, like in the evaluation audio, give with the evaluators when you're talking over something, you can talk over your PowerPoint presentation. A lot of interns do that. Yes, Arsal, do you have a question?
Yes, sir. Am I audible?
Yeah,
okay. So, I want to ask, is there a need to dockerize the application, or
that there's no need to dockerize?
Okay. Thank
you. Evaluation process is pretty similar to up universities, Magistra Evolution for some for the online evaluations, I don't know, got up, angry, same, any, but basically you're going to join a call for maximum 10 to 15 minutes. Was me initially, you're gonna talk about the project, the problems you faced, and when you're talking about that, you can talk over your report or a PowerPoint presentation job. Nikhate, this will take you about five minutes, and the five minutes after that project run, and if the value just has any questions, if they're looking at your GitHub actions logs, they see Kuch pipelines fade over here. Yeah, if they're anything from code that they find weird, then they will ask. They will try to give you a tough time and just try not to crack under the pressure, and if you meet a certain threshold, then your evaluation will be passed, but who up, go instantly, nib, that will be communicated to you later. If you pass the evaluation, then you will be invited to the 10 Press Office. There are three offices: Karachi Law, Sambad, so whichever is the closest to you, you can join that one. And yeah, then there's a certificate distribution ceremony. Okay, if, if no one else has any question, then we can conclude this session. Yes, it's not recommended, recommend sort of report, but the evaluation children yogi, you can talk over a PowerPoint, that's up to you. Presentation, okay, sir. Thank you.
Transcript limit reached
You've reached your 30 minutes per conversation transcription limit. Upgrade to get the full transcript.
How accurate was this transcription?

00:0031:59



1x



