Technical Sync-Up - Data Sciences
More options

Salman Khan
May 29 at 4:02 pm
31 min

76 screenshots

copy summary
 Shared with: 10p
Summary
Transcript

Template:
General
Overview
More options
The meeting focused on the technical aspects of a data science project with a deadline of June 8, 2026. Key points included the use of ensemble learning and asynchronous functions for ML models. The importance of training multiple models and choosing the best one was emphasized. The discussion also covered the use of cloud feature stores like MongoDB and Hopswork, and the necessity of deploying UI for accurate evaluation. Specific metrics mentioned were a mean absolute error of 11.46 for AQI predictions and a 33% improvement in persistence. The evaluation process and the need for a demo video were also highlighted.


Bullet point

Table

Shorter


Action Items
More options
This list can be reordered. To drag an action item, press space or enter on the drag handle. Use the up and down arrow keys to move the action item. To drop the item, press space or enter again. To cancel drag and drop, press escape.


Confirm the exact evaluation start date and time (originally June 8, 2026, 5:00 AM) and communicate the confirmed schedule to the students.







Use ensemble learning (for example, weighted averaging) in the AQI prediction project, in addition to other multiple approaches, to improve model performance.







Implement and run the ML inference server with asynchronous or non-blocking steps where appropriate, while keeping the overall pipeline simple and not over-optimizing for IO.







Complete the project platform, daily pipelines, logs, and checker by June 8, 2026, and ensure models are trained and evaluated so they are ready for evaluation.







Reply to the students’ unanswered messages after this call, addressing their questions and concerns.







Train at least three different models for the AQI prediction project and use a separate model selection step to choose the best-performing model.







Use a lightweight model storage approach (for example, storing models in a lightweight format) instead of a full model registry for the project.







Use a simple local feature store (for example, MongoDB) instead of a cloud feature store for storing features in the project.







Use Airflow DAGs instead of Hopsworks for orchestrating the data pipeline in the project.







Forward the quiz portal issue (missed quiz deadlines and quizzes no longer available) to the portal owner in Islamabad so it can be investigated and resolved.







Attempt the available quizzes even if they are past deadline, since they are part of the evaluation rubric.







Schedule and conduct 10–15 minute project presentations for all students starting right after the June 8, 2026 deadline, rotating presentation slots during weekday afternoons.







Use additional weather and pollution features (beyond AQI) as input features when predicting the next three days of AQI.







Store models in MongoDB as the model storage solution for the project.







Use lag features (for example, one-day, two-day, three-day lags) and rolling means of pollutants in the AQI prediction model to improve day 1–3 forecasts.







Deploy the project to a cloud platform (for example, Render) so that the UI and prediction pipeline are available for evaluation.







Record this session and share the recording with the students.







Ensure the project includes a model registry, a feature store, CI/CD pipelines, and a UI, and that the prediction pipeline is working correctly so the internship can be passed.







Use a script to migrate data from CSV files into a database for future projects, instead of relying solely on CSV files.







Create a demo video showing the next three days of AQI predictions to present during evaluation, in case the Hopsworks pipeline is unavailable.







Email the coordinator if a special evaluation time slot is required (for example, due to final exams), so that an alternative slot can be arranged.







Use data from AQI and OpenWeather APIs and perform feature engineering on that data for the AQI prediction project.







Store model history and model files on Google Cloud (for example, GCP) instead of on Hopsworks.







Use GitHub Actions to run the CI/CD pipeline, either automatically or by manually triggering the workflow, and ensure the logs are visible in the GitHub Actions UI.






Add action item

Outline
More options
Project Deadline and Evaluation Details


•
Speaker 2 confirms the project deadline as June 8, 2026, at 5 AM, and mentions the evaluation should start from June 8.


•
Speaker 3 inquires about using ensemble learning and asynchronous functions, to which Speaker 2 agrees.


•
Speaker 2 emphasizes the importance of completing the project by the deadline and evaluating models, logs, and daily pipelines.


•
Nikhil asks about training models with historical data, and Speaker 2 advises using multiple models and choosing the best one.


Backend Requirements and Feature Store


•
Speaker 4 asks if a separate backend is required, and Speaker 2 explains it's not necessary as the focus is on data science.


•
Speaker 4 inquires about storing features locally, and Speaker 2 suggests using a cloud feature store like MongoDB.


•
Speaker 3 mentions using Airflow and DAGs, and Speaker 2 confirms it's an acceptable alternative to Hopswork.


•
Speaker 5 raises a concern about missing quizzes, and Speaker 2 promises to relay the issue to the relevant person.


Presentation and Evaluation Process


•
Speaker 2 outlines the presentation process, including PowerPoint slides, project reports, and deploying for three-day predictions.


•
Speaker 3 asks about using additional data for models, and Speaker 2 confirms it's acceptable.


•
Speaker 7 inquires about verifying predictions, and Speaker 2 advises using one-day, two-day, and three-day lags.


•
Speaker 7 mentions issues with Render starting automatically, and Speaker 2 suggests scheduling hourly deployments.


Model Prediction and Evaluation Criteria


•
Speaker 8 asks about the evaluation criteria, and Speaker 2 explains the pass/fail system and the importance of model registry, feature store, CI/CD pipelines, and UI deployment.


•
Speaker 8 inquires about the number of quizzes, and Speaker 2 confirms three quizzes are required.


•
Speaker 10 asks about using CSV files for data storage, and Speaker 2 advises using cloud repositories like Hopswork.


•
Speaker 11 mentions issues with materialization, and Speaker 2 suggests using alternatives like Feast.


Data Sync and Evaluation Schedule


•
Speaker 12 reports issues with data sync and mentions creating a demo video for evaluation.


•
Speaker 12 asks about the evaluation schedule, and Speaker 2 explains most evaluators are available from 2 PM to 5 PM.


•
Speaker 13 inquires about feature engineering, and Speaker 2 confirms it's acceptable.


•
Speaker 14 asks about materialization issues, and Speaker 2 confirms it's acceptable as long as data is stored in the cloud.


Final Questions and Clarifications


•
Speaker 15 asks about scheduling GitHub Actions, and Speaker 2 confirms it's acceptable as long as logs are updated.


•
Speaker 15 inquires about materialization issues, and Speaker 2 confirms it's acceptable.


•
Speaker 16 asks about using traditional machine learning models, and Speaker 2 confirms it's acceptable.


•
Speaker 17 inquires about materialization issues, and Speaker 2 confirms it's acceptable as long as data is stored in the cloud.


Technical Sync-Up - Data Sciences
More options

Salman Khan
May 29 at 4:02 pm
31 min

76 screenshots

copy summary
 Shared with: 10p
Summary
Transcript

Edit Transcript
Keywords
Project deadline, ensemble learning, asynchronous function, ML model, feature store, cloud repository, historical data, model training, prediction accuracy, evaluation criteria, UI deployment, data sync, feature engineering, API values, Karachi weather.
Speakers
Speaker 1 (58%), Speaker 2 (7%), Speaker 3 (5%), Speaker 4 (5%), Haris (4%), Nikhil (4%), Speaker 5 (3%), Speaker 6 (3%), Speaker 7 (2%), Speaker 8 (2%), Speaker 9 (2%), Speaker 10 (2%), Speaker 11 (1%), Speaker 12 (1%), Speaker 13 (1%), Speaker 14 (<1%), Abdul (<1%), Speaker 15 (<1%)
PCA,
you should have got
I'll be late, I
This is where two minutes let everyone join back usually.
Oh, okay, sir. Actually, made it a job, so
yeah, yeah. I'm sorry, I got you off.
She's a family job, yeah. yeah, sir. Let's say when, when we are going to have our valuation, like June May,
yeah, June May, june 8 was the original date. I think it got moved. Let me just confirm. Okay, due date is June 8, 2026 and 5am so june 8, give me like June seven, yeah, then the evaluation should start from june 8, okay,
so sir, actually many technique explore crazy, just can made up like project to ban me. I like in her ML model, get through your AQI camera differences. So, can I use ensemble learning like weight technique?
Yeah, you can. You can use that ensemble learning there, I'm a multiple approaches you can do, but yeah, yours is correct as well.
Okay,
also ML infin server better, like asynchronous function use karo ya non-blocking
IO. Yeah, that shouldn't be much issue with a heavy task. We're going to wait a lot for your predictions, so I don't think you should worry about that. Yeah, you can have some asynchronous steps in your entire process, or sitting might speed up coffee. Wait, Nikhil, not a person, but yeah, escape prediction, man. There shouldn't be an issue strike apart. You don't really have to min max that much. Okay, just letting you all know. Okay, june 8 is the deadline for the project. It's part that you guys should be platform, complete, and you guys should be evaluating your models, basically logs, checker, and your daily pipelines and orient those you should be checking. I can see each login submissions career. I'm sorry you couldn't reply to anything, and I just wanted to relax a bit, so I'll get back to you on those messages after this call. Yes, if Sanatim, do you have a question? Your hand is raised. How can Nikhil have a quick questioner,
but Firebase Pay store many historical data one year key open weather se Nikhil history though model train key a range recreation or those random forest produce the train came in a history historical data or five, basically, don't over train, cater your accuracies, other three both the random forest key film crypto batch and be every day had then more train of automatic user dashboard a latest model yoga for load over three days prediction. Okay, this is fine.
Yeah, it's fine, but it's my part. Okay, you're just training two models, so I think those should be three, and on three message you have to choose the best one
minute though train game for egg best choose clear,
yeah, but ski judgment with it should be carried up multiple models, which is a hard requirement. Those case may be at least up three models train government that applies for use, and then only miss best. Yeah, that's that's common. Zip certificate emails in contact with you, so we usually may pass forward, Oti, and I just sign that and return to you. Yes, Arsal, you have a question.
Yes, sir. Am I audible?
Yeah,
okay, sir. I wanted to ask, is it first of all, is it a hard requirement to have the back end on the Flask or Fast API, or something? Or can I use basic apps, considering I'm using Streams it for the front end?
Yeah, you're not really required too much to get a separate back end to upstream, because the main point of this is data science. We're not ready to can get your software engineering and those skills,
okay? And sir, one more thing: Hobsley features store me with jobs run, can even about time later. I stored the files locally available, I stored my all the features locally, and does that work as well, or should do I have to use something as well?
Yeah, locally feature store using a cloud feature store is important. I would just say Hobson, tags simple, or for feature store up MongoDB shoes.
Yeah, no problem with yeah, GitHub action
class we home
look air flow and DAG use correct instead of Upwork,
yes alternatives key option you can use them, Hops work hard requirement, that's just one of the most common to recommend, yes, William Shayla Madam
Chair, sir. Actually, I had a problem, maybe last week, final exam still, so I missed the quiz deadlines, and right now they are not available on the portal. So, is it like,
have you asked her to give you, I think she's this.
Am I audible right now?
Yes, you're audible,
sir. Yes, I had a problem that last week made a final exam, so I missed like the quiz deadlines, and right now they are not available on the portal, so is it like possible, and Bara, like even for our day
quizzes key deadline is fixed, but let me, let me get back to you on the on the quizzes kissing a chat make all quiz kaso alika use code 100%
yeah basically disappeared from the portal after the deadline.
Okay, so yeah, let me just forward this associate in Islamabad is working on the portal, Lily Cheese, so I'll just relay that to him. Quizzes Kamikh, okay, you guys shouldn't worry too much about them, cash flow on cases are in the quiz, so probably would discard or change, but still general, because you guys should attempt them for the okay, I'm not correct, yeah, because this question present presentations hongi, and you have to be prepared. Basically, this 90 calls are just not the one on one call, okay with the evaluator, and up co present khan project. Also, sure, may you will be going through your PowerPoint slides, like your report, and after that up, khan Mobeen average a deploy on karenge for the next three day predictions. It should be maximum 10 minutes. Presentations will start right after the deadline to eight students. Start using presentations and week days conduct rotating towards any time during the afternoon, probably to start here, and then you'll just have to join 1015 minutes presentation. Okay, let me
see, so presently, Discord like right
email, email PSAT contact me, I move our thoughts around again
Will be able to move our thoughts around,
yeah, you should be able to do that, and I think originally up a slot, but you can probably message the HR kid this time doesn't work for you, so she'll adjust that.
Okay. Thank you.
Yes, do you have a question? am
I audible?
Yes, you're audible.
So, I had two questions. Firstly, that can we use forecast weather polluted, and etc. other than the AQI stuff for our model,
you shouldn't give a requirement of the project just like next three days key predictions, but pollutant at all the stuff is still important features to try to use them when you're predicting the next three days a QA.
Secondly, we are using MongoDB as model storage, so is that an issue?
It's not an issue, but we recommend it, Nina. But yes, my question, you honestly can get models, coffee light weight, and right now
taking predictions from Open Meteor. My question was that fine,
yeah, but you mean up now historical data to Open Meteor API, CEOs, right? feature, yeah, that shouldn't be an issue.
Okay. Thanks.
Yes, Muhammad. Any question
model key prediction around? So day one ask day one day to alike prediction lines but
you should just verify your outputs. Me, day one and day two, the prediction same scenario, because that
day one day to the day three or day three, same area, like in day one or day two, alike.
Okay, okay. Um, okay. Up nigh future, say, try using one day, two day, three day lag. Then probably question units. Just verify those
a leg alike. I mean, a rolling means, because I remember Nikhil PM 2.5 rolling means, or pollutants get rolling means for the day and a half,
yeah, that is common. Other days prediction curriculum, your prediction might still start falling off, so it shouldn't be too much of an issue. Day three cup, it's accurate. Niya, they want to make sure that's that seems correct.
So, yeah, or Bakhi server over deployment, Hamara, because one of the issues I'm facing is Render starting your auto manually.
What I would say is good deploy career demo home.
As a features pipeline,
yeah, just just make sure a schedule hour by hour set, but it's common delays are and we understood, understand those run
over where alien hour by hour
overall, the saree execution, as may we should be looking at green check boxes again. Make any red background, so that's a question mark. Why is this feeling
or final chasti hamari jo evaluation?
Reschedule
Nina Man I report banana pass coffee
yap the screen share khanian you can talk over the presentation you can talk over that just we bought and make sure to highlight your projects, a what were your blockers, and then cop nucleus, and resolve, and up UIB should be running, and up, nah, hot open a UA, and optionally deployed at the evaluates you can also run on their own system. Sam, thank you,
sir. Am I audible?
Yes, you're audible. Who's talking,
sir? Muhammad Ahmed. First of all, sir, I don't know.
It's all right. I'll try to record the session, but settings regarding the mute and click white thing change, but yeah, try to get them resolved in the second call as well,
like up in previous class to meet certain requirements to clear a threshold meet threshold
Marks 70% reach order, then your internship is marked as complete. Varna, then it is marked as fail. Additionally, Agar, there are three criteria: there is fail, there is good, and there is excellent. So, 70 to 90% that you're probably being gonna be given a good grade again, 90, so for a 10 100, then you will be given an excellent grade, but another 72nd you'll be given a fail, and probably no certificate, so just try to get better than 70% Rubrics can exact break down, but sure, so there's a rubrics for maintain, or may you just need to score more than 70% to to get passed, and to get the part to get passed, and get the certificate. I'm 70% clearly. There are a few things you have to do to saliary compulsory cheese in the document that's shared to you, the model registry, the feature store, the CI/CD pipelines, and the UI.
 If those four parts are done, then probably we're going to be passed. Next, CD prediction is the most important thing that should also be working. Jump it towards a freedom reflector that is UI fully deployed. Niamh, instead, encourage everyone, give a deploy correct, but you'll be probably getting like 80% or 70% mark still if your UI isn't deployed,
sir. Our score, we threshold
exactly recovered when we're evaluating if the model is predicting correct or not, prediction cycle, you can just have a rough idea.
One last question, like I have to confirm only in quizzes he upload. I'm
not sure quizzes and portal will be website I don't handle, but three quiz sounds about right. Total quiz menaphor, okay with it, and I think it last week may call Quiz Abdul.
Sure. Yes. Muhammad Sohaila fees.
You have a question? No, Nadi said you have to use a model registry. Try not to show the look,
sir. Am I audible?
Yes, audible,
sir. Basically, past historical data set download key at a CSU format CSU file me data cleaning, currently feature extraction with local key
Try to avoid using csv files and saving your features locally. Cloud repository may store, so just try looking into Hops work and other feature stores.
Open a pipeline, banana. historical database
that makes sense. Paragraph as intermediate step use career to process the data, then Um, yes, I haven't really heard of Feast, but it is an alternative alternative feature store. Then you can use that. Yes,
materialization never submitted earlier. Success new successes are making from Arkan. yeah.
Hops work. I'm starting to realize kitna reliable niya these days. Initially, I'm caught in a coffee long coma, senior, but since the last quarter, so I will just say, okay, try using tax alternative to hops work,
like another expert.
You still have time to do firstly, secondly, I would say, whenever you're creating projects, season they do come, especially database-related projects. so what? What's done for them is probably script like that somehow migrates your data exceed file. So this should be a good learning lesson from UK. In case this type of thing occurs again in the future, you're prepared and better, better you're able to handle these type of situations,
okay. So, thank you.
Yeah,
jobs were up and running again yesterday. UK, project deployed, and I was having the data sync issue 21st May onwards, made up front and the was set of 21st data or prediction materialization jobs complete new data mainly rather, but yesterday the jobs were running fine again on Upstart.
Yeah, then that's all right, but what I'm starting to realize is key valuation. Then that's going to look bad for you,
proof of concept. I mean, a good picture data, but I thought maybe that would be like enough to show. Okay, for example, the pipeline version may be like the if the platform of Opsic itself is down, so that's an issue of course that I can cater to, but it's something that was working fine when Hobsburg was working fine.
Yeah, what I would say is gender gonna especially Hobsphere to come. Just also create a demo video to show your next three day predictions, just in case evaluation Hobsburg isn't working for you guys. Okay,
got it. So add one question, though. But I think a June onwards evaluation schedule Coffee limited, so even if I have the choice to pick my own slot. I'm worried no slot will fit.
Yeah, that's all right. S case may, but you can, but you can do is happy evaluations pool of evaluators is selected, and I'm supposed to come get time to evaluate, so most of the validators from 2pm to 5pm we are going to be available, and to scan a 1515 minutes slots book over, so I guess the same thing will happen this time as well. Job slots with anger and depends on the validator, but but most of them keep the slots from 2pm to 5pm so it's usually going to be booked within that time. How hope that answers your question.
Yes, it does. But how would it work if I'm not available between two to five?
Yeah, email if just if it's just a special case for you, then maybe up TV can baby addition. There shouldn't be an issue,
sir. Actually, maybe 14 June to final exams, 14 June to extend new winner.
Yeah, I don't think so. It will, but then again, over 100 I can see in this meeting, so it can stress till then. But yeah, it's the same thing, special requirement. You, you can just email and up key, okay. Muhammad Usman, do you have a question?
There was no problem in feature engineering, right?
You're muted by the
If I take like the data from like ACN and open video and do some future engineering, would that call a problem or no? No,
no, that would not. You're allowed to do that, actually. Rubrics 90 recovery, you should probably do that, I You're muted again. You can type your question. I got it up to my camera. I've Icon deep learning model is an optional part. This normal traditional machine learning model should be enough. Hamza, you hand your question.
Yes, sir. Certainly, we
hope
so. Key materialization. Other issue 20 days, Google Cloud pay migrate earlier, so is it
acceptable? Yeah, that's acceptable. I initially up capacity and GCP, where to make it work, so yeah, shouldn't be an issue.
Model history about storage file value,
yeah. As long as it's on the cloud.
Thank you.
Yes. Aisham,
welcome, sir. Student name data actions mischeduling, so schedule, so is it allowed? Can the customer?
Yeah, yeah. As long as up to your logs and they show up on GitHub and GitHub Actions user, then you can, but apart from that completely different service key bath khan, then I wouldn't recommend that you shouldn't do that.
GitHub Action scripted manually concerned or not,
then it's all right, even manually trigger current that still shows up in the logs to Boston yoga.
Okay, second thing due to materialization issues
was talking, you muted. Okay, yeah.
Get our mute view worth a coffee time. So, yeah,
yeah.
So basically, sir, Mera Joma project agree when a half the ali ho geta complete lekh issue yore ke mirror jo eda Jupyter notebook in the geo mirror mean average error hai absolute error wo 11.46 tako char arata jo or persistence mata 33% improvement in comparison to persistence again, must lie a ke job may also production melee forecast can the variation both come aria mail like features use kno basically abdul latest man approach karriyoten pollutants approximate karam multi regressor get through perusket with recursive model 11.34 mean absolute error legal forecast around to around 66.9 66.3 he will predict so much near a production me kylla jab ke mean error coffee comma edm edm,