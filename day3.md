Technical Sync-Up - Data Sciences
More options

Salman Khan
Apr 24 at 4:01 pm
36 min

34 screenshots

copy summary
 Shared with: 10p
Summary
Transcript

Template:
General
Overview
More options
Muhammad Mobeen led a technical sync-up session for data scientists, discussing a project on predicting the next three-day AQI using machine learning and a serverless stack. The project requires using Python, feature stores, and model registries, with flexibility in front-end libraries and APIs like openweathermap or openmeteo. Participants should collect two to three months' worth of data and train models daily. GitHub Actions will automate data fetching and model training. The project also involves creating a front-end application and maintaining a GitHub repository. Mobeen emphasized the importance of using multiple models and understanding feature importance.


Shorter

Longer

Key takeaways


Action Items
More options
This list can be reordered. To drag an action item, press space or enter on the drag handle. Use the up and down arrow keys to move the action item. To drop the item, press space or enter again. To cancel drag and drop, press escape.


Contact HR to confirm quiz retake policy and address complaints about quiz scheduling and portal notifications, then report back to the group







Reschedule the quiz on the portal, post the new quiz announcement on Discord, and notify participants of the change







Fix meeting permission settings to prevent participants from muting/removing others and improve meeting access for future calls







Respond to participant questions sent on Discord within one to two days (avoid weekend responses when possible)






Add action item

Outline
More options
Project Overview and Feedback on Last Session


•
Muhammad Mobeen initiates the session, asking for feedback on the last week's session.


•
Shoaib Zafar mentions that the last session was good, with many questions about tools, practical development, and documentation.


•
Muhammad Mobeen introduces Danish Baa, a staff data consultant with over 10 years of experience, who recently joined from Jazz.


•
The session will be short due to another meeting at 4:30 PM, and Muhammad Mobeen plans to give an overview of the upcoming project.


Project Purpose and Serverless Stack


•
The project involves predicting the next three-day AQI for various cities using an end-to-end machine learning approach.


•
The purpose of using a serverless stack is to optimize costs by only charging for actively used services, with free trials and limits available.


•
Participants are encouraged to use Python for programming and scripts, with some flexibility in front-end libraries and APIs.


•
The project aims to instill corporate work ethics, including the use of feature stores and model registries to avoid local storage of data and models.


Data Collection and Feature Engineering


•
Participants are free to choose any weather API, such as openweathermap, openmeteo, or AQICN, to fetch data.


•
It is recommended to collect two to three months' worth of data to capture seasonalities and trends.


•
Fatiha Maryam asks about the risk of overfitting, and Muhammad Mobeen explains that the most important features are from the last two to three days.


•
The process involves data collection, feature engineering, and model training, with a focus on using a feature store for data storage.


Model Training and Automation with GitHub Actions


•
Models should be trained daily, and the best model should be selected based on metrics.


•
Participants are encouraged to use multiple models and compare their performance.


•
A front-end application should be created to display the project's output, using libraries like Streamlit, Lit, or Gradio.


•
GitHub Actions are used to automate data fetching and model training, running scripts hourly and daily to update the feature store and train models.


Q&A and Clarifications


•
Muhammad Mobeen answers questions about the use of CSV files, feature stores, and GitHub Actions.


•
Participants are advised to use openweathermap or openmeteo APIs and to avoid using pre-made datasets from Kaggle.


•
The importance of understanding feature importance and using multiple models is emphasized.


•
Muhammad Mobeen provides contact information for further questions and clarifications, encouraging participants to reach out on Discord.



Technical Sync-Up - Data Sciences
More options

Salman Khan
Apr 24 at 4:01 pm
36 min

34 screenshots

copy summary
 Shared with: 10p
Summary
Transcript

Edit Transcript
Keywords
AQI prediction, machine learning, serverless stack, feature store, model registry, weather API, data processing, feature engineering, GitHub actions, CI/CD pipeline, Python programming, data collection, model training, front-end application, data analysis.
Speakers
Muhammad (84%), shoaib (5%), Fatiha (3%), Haris (2%), u2023342 (2%), Haroon (2%), Sidra (1%), Speaker 1 (1%), Speaker 2 (<1%), Speaker 3 (<1%), Speaker 4 (<1%), walisha (<1%)
Doing Portugal so
I'm just letting everyone And then we can start the session. I
Khan, Salman Khan, everyone, hopefully last week a session was good for all of you. Any feedback? How was the last week session? I was seeing a lot of chat messages. I'll get to this.
Last week's session was good, like many questions regarding some tools, practical development, documentation, it was good.
She like up low coffee, practical. So I posted regarding the job market and stuff. So hopefully up got chance from Danish Baa. He recently joined from jazz, and he's a staff data consultant here at temples. I think he has over 10 years of experience. Or around that don't you like? Whatever he's saying us cup eight coffee, Zafar, compared to whatever I say to upload the identity, okay, sunning baby. Hopefully it was like that for all of you. Okay? This session is going to be a bit short, because I have another meeting around 430 so I just wanted to give all of you a rough overview of the project you will be working on, because Logan a policy day clear. But the purpose of this is questions, or if someone's trying to figure out something, so they can ask that. And when I'm going through the whole project, you will some concepts be clear. So Okay.
Second, okay, is it is the screen visible?
Yes, it's visible. Okay,
yes, okay, it's visible. Okay. So this is your project, whether AQI prediction. So the main purpose of this project is so you guys understand how an end to end machine learning project works, as well as you understand the serverless stack. So the point of using a serverless stack is here is you are trying to optimize cost, and you're only going to be charged for the services that you use, and only when they're being actively used. Hopefully, none of you guys will have to pay for any of these services, because there are free trials, and there are free limits for these trials, which you will probably not exceed because people have not exceeded them before that, and there shouldn't be an issue regarding that. So your project is so the main purpose of your project is, so whichever city you are in, whether it's Salman BAA law or Karachi, you have to predict the next three day AQI
 of your city and that others. And that has to be constantly updated. So if I'm running this service now, it should tell me for the AQI for 25th April, 26 April, 27 April. And whenever it's being evaluated, even from a month from now, it should tell the next three day prediction of those of that current date. So that's the main purpose of your project. Moving on to the stacks that you will be using, you have a lot of freedom in whatever front end library you want to use to show your app, whatever you want to use as your API to get the weather quality data, there's a lot of there's a lot of freedom over there. One thing I would like to see in terms of the programming language and the scripts that you will be writing, try to limit that, try to work within Python, because that's one of the hard requirements for this project, and it's for the people in data science domain. That's the main that's the main library, that's the main language that we work with. Two main things, terms that you might not have heard before are feature store and model registry. If any of you have
 worked with machine learning projects in your university life, in your whatever personal projects, you probably store your data. You probably store your models, everything locally. That's something we are trying to avoid over here, and that's what we're going to be working on over here, is trying to instill some of those corporate corporate work ethics, something that is really important when you're collaborating with others as well. So that's where feature store and model registry comes in. I'd encourage you guys to learn about these two terms yourself as well. But I'll also give you a rough overview when we're working on the pipelines. Someone in the chat asked a question just when the session started, that should the where should we get the data set from? So this hopefully answers your question. You will be integrating weather API's in your project, so you have complete freedom whichever weather API you want to use, whether it's open, weather, open, meteo or AQ IC, and as mentioned over here, you will basically be fetching data from there to populate your data set, to extract features, to perform feature engineering and all those tasks. But this is the main area where you're going to be getting your data from. Ideal recommendation is to at least get two to three months worth of data from your city. So if I'm in Islamabad, I would preferably get the weather data for the last three months, if someone wants to add all the seasonalities, if they want to see how, if they want to train their model by seeing how the AQI is affected in winter, how it's affected in summer or different weathers. Then they can go as far as one year or two year to try to capture all those trends and all those seasonalities. But I would recommend two to three months should be more than enough to get up and ready with your project. So this is the main thing you have to do, try to figure out how which API you will use, and how you will incorporate that and fetching data and trying to create your data sets. And one thing I would discourage is try not to use already made data sets from Kaggle, because they will not, first of all, they won't have your cities information. And secondly,
 they will be pretty old. So you just want to get your cities information, and you want to have the current, current AQI trends, which you can get from these API's. Second step is feature engineering, yep,
if we use two to three months data, then wouldn't it cause overfitting?
It won't cause overfitting. And you when you're working on your project, you will realize that, when you're doing shap analysis and all that stuff, you will realize that the most important features are retrieved from the last two to three days. They're the ones that mostly affect your next two to three days. Next three days, whether API, API prediction, it's one of those things, when you start experimenting, you'll you'll understand,
Okay, hopefully that answers your question, yes. Thank you again. I have a question. Collect data, like 200 rows. Load Data for the distribution table session like daily collect Kiran, because each time I run the collect.ui like file, 20 rows are like, selected like, every day I have to collect data.
Yeah, yes, you have to. And I'm going to get to that part afterwards as well. So, so once you have the data, you have to perform the normal machine learning project, stuff that you already know, some of you already know how to do, but you have to process the data. You have to select the required features from the data and discard the features that you don't think are important. All of that stuff, feature engineering and data processing is as expected. The third part is the one which is confusing for a lot of people,
 and it will be new for all of you, is that you have to incorporate a feature store in your project. So what a feature store is, is it's a similar thing to a concept you guys already know, which is called database or a database system. We store all of your data, all of your information, in a central repository. The same the same way a feature store works, where all of the features you are collecting from your weather, AQI, from APIs, you are going to process them, and you're going to store them in a central repository that's living on the cloud, not on your local systems. And you're going to push all of the data to that, to that feature store, and you're going to process it and fetch that, and whatever you prediction, you're doing model training. You're going to get the data from the feature store, not your local hardware, not your local file system. After the after you get the feature stores, after you get the data from the feature stores, you also have to train your models on a daily basis. So once you train your model on a daily basis, my today model might predict for the next three days, and the model that it trained tomorrow, its job might be to predict for the next three days after that. So you have to constantly train your models, and you also have to store those models in a model registry. Model registry is basically the same thing as a feature store. It's a cloud feature store is a cloud repository that stores your features, but a model registry is a cloud repository that stores your models. Hopefully, that's there's no confusion in that part. If, if any terminology is confusing to you, I can also explain that. Now to the next part is automated. Pipeline runs. So whatever you're maintaining,
 whatever you're doing, you have to maintain a GitHub repository for that project, and when you're maintaining a GitHub repository, you have access to a lot more GitHub tools and features. One of those features is GitHub actions, which is a CICD tool that you can use to automate a lot of redundant tasks. So in this project, one redundant task over here is that you have to fetch data on a on a daily basis, in fact, on an hourly basis. So your request to the weather, open weather website or the open Meteor website, APIs will will require you to run a script every hour to get the latest data that you have to push to your feature store, and that's where your that's where GitHub CICD action pipeline comes in. You don't want to be on your computer every hour and running the script, so CICD GitHub actions pipeline will automate that part for you. It will fetch the latest weather information for your city and upload that to your feature store. Once the script is run hourly, you have, you have to make another script that runs daily. And the purpose of the daily script is to retrain your model, or train new model on a daily basis. Which will predict, which will be helpful, which will be needed to predict for the weather prediction for the next three days. One small thing over here is that you will have to train multiple models, not just one model, and you will have to select a champion model or the best model out of the multiple models that you're training. I would recommend try using metrics to judge which which model is performing the best and when someone's evaluating your project, try to select the best model every day and show the outputs of the other two models for comparison
as well. Third part, it's not, it's important, but it's not expected of you guys to excel over here is but you have to create a front end application to show all of your output. So you can use any pre built library, stream, lit or gradio for the front end, and even if someone knows react over here and the last code, a few people knew that, so you guys can use that to create your front end application. You will also have to maintain a back end to process everything to get requests from the front end. So you can use flask or fast API. There are a lot of resources which can help you understand about these libraries and AI resources can also really help you get up and running with these these projects. But this is we're not really going to be grading you that much on this part, but it's expected and necessary for you guys to implement. The main thing we will be checking is the AI pipeline and end to end machine learning. Things that are mentioned in the start, some guidelines are mentioned over here. Just try to get your work done before
 the deadlines. The shop analysis I mentioned. Try to understand the feature importance, which which features are important for your weather predictions. And also try to use multiple models instead of just one model, because you You never know. You might think one model would perform well for the situation, but another model is probably exceeding that. Yeah, that's pretty much about the project. If you guys have any questions, and you can ask them or drop them in chat, let me see
someone raised their hand a few minutes ago. The Khan
the yes, you guys should use open meteo if you can in terms of feature store, you can use hops work, or if someone's having trouble with working with hops work, you guys can also use MongoDB as a feature store. That's completely acceptable. Coffee frequently asked questions that, can they use CSV files to store their data? And you had to repeat but you are not allowed to use CSV files just try to directly process your things using a feature store. Okay, someone asked to tell again about GitHub actions and CICD. So let's just move to that. Yeah, so CICD pipelines are made to automate redundant tasks that you have with your project. So if I'm talking about something that we're doing at 10 pearls, or you might do in any any place you end up working on working is that you have to deploy your deploy your projects, right? So whenever you're creating any any application, you're pushing changes to your GitHub or GitLab, whatever you're using, so the new code gets pushed, but the website that you're running, it's still running on the previous version of your code. So to to automate that part, CICD pipelines are scheduled to run, to redeploy, rerun, recompile your code, basically, and update your websites. That's that's the most basic example. But over here, the way you're going to use the CICD pipelines is a bit different. You're going to run a scheduler, or you're going to add scheduling rules to your to your GitHub actions pipeline, and you're going to run two types of pipelines. First pipeline is going to be your data fetching script, which will be running hourly, and the second pipeline will be your data training pipeline, which will be running on a daily basis, which will train multiple models. That's the main task.
You will not have access to the recording. Unfortunately, it's against the company policy to share the recordings after the session. So, yeah, unfortunately, last, last quote, maybe Logan Zafar, so it's not going to possible.
Yes, these are common things that you will face Usman, but when you train multiple models, it's easy to tell which one's getting fine tuned, which one's getting overfit and which one's doing the correct predictions. Yep. Anyone else have a question quiz up long Khan, whether they're allowed to attempt them twice or not. I'll have to confirm that from the HR person, because shine portal, we maintain current it's not on my end.
Yes, you can use mlflow Amar. Let
me just bring the screen back up. Question, there is
not a
hard requirement, like an AQI idea whether it's correct or not, also previous day trend look they collected, and then they see your output for the city to certain quality, whether your predictions are similar or not. But there's not a hard requirement. I think you guys will be using r2, score, f1, score is your matrix. One more thing, I will not be evaluating everyone's project. Kim K, there are too many people here, so your project evaluate. You have to explain the project thoroughly to them as well, because on ke Baa, Sidra context, Nik, yoga.
Thank you, sir. Thank Sir, in case I got AQ hazardous area under the curve, use, can you repeat
that? Please?
In case of the AQI ml models, API call, alerts, page, certificate, so ml, model predictability, maybe, efforts under the curve, yep. So currently, like is cool, subscribe, alerts back and say friend and the back end and
yeah, that's a that's a good question. One thing about this is you can manage my freedom the way that you can use whichever API you want to use, open weather or open meteo. Some of these APIs, they return values from a range of 100 to 500 so this inherently becomes a regression problem. Those case may you can't really use accuracy over there as a metric, and some API's use open weather, and some people use open weather as their API, and open open weather returns output in a range of one to five. So it your output will be classes from one to five. In that case, this becomes a classification problem. So over there, you can use accuracy as your metric of judging, and judging your model. Hopefully that answers your question. I to be honest, it was bit mixed up. I'll also
have a question like, I have my notification like quiz and portable because and chat, maybe coffees. Nice show. So what's that?
Okay, I'll contact the HR people for that. I got coffees, which I'm seeing complaints regarding that. Then we can discard the first quiz, and we can have them in the next week. And I'll also try to get the announcement on Discord for the following quizzes. Says, Sure, Fatima, sure. We'll try to reschedule your quiz and we'll have a new quiz on the portal and announcement be maker on Discord.
So I had two questions if I'm allowed to ask, yeah. First of all, I wanted to point out the fact is meeting, for some reason, everyone has permission to do anything. For example, right now I can mute your mic or remove you from the meeting. So so I feel like maybe, if that can be restricted, give you a domain. Someone removed me from the meeting twice as well.
Okay, meetings. Someone else schedules those for me to manage key configuration. Nikhat, I'll tell the HR people, because manage, I try to just come here in the sessions. I just worry. I just work here. Mobeen, yep.
So I have a question that you mentioned that we'll have to train multiple models for our project. So my question is that is this during our like testing phase that that we have to identify the best model, or we have to ship it till the last step, like we have to integrate this in our CI, CD pipeline that will have to show the mentors that we are training multiple models.
Yeah, multiple options. You have to always train multiple models, so the whether they want to push all three or all four models that they're training to the model Registry, or you can, you can just calculate the metrics right over there when you're training the model during evaluation, and you can just push the best model on the model registry. So that's completely up to you, but you have to in your training pipeline, the one that runs every 24 hours, train multiple models. That's the consistent
part. Such an AQ, AQ, IQ value, linear Muhammad points many digits, millennia here kindly with other,
I think AQI value return over here from the API's, they are in values. I don't think decimals, if you're talking about but depending on the API you use APIs, hundreds, 500 Kiran decimals, Millennium values. That's dependent on the API that you use, if you're using open meteo and everything on Kiran Jyoti, from 100 to 500 so I think they can go to decimals. But if you're working with open weather as your API, then up key value one to five, which will be distinct classes of 12345, so if you're depends on your API that you're using, yes. Haroon, September, yes. That's acceptable,
sir, basically you can go first, okay.
It depends on the data classification problem, regression problem, yep,
yes, okay, sir. So basically, my question was like, for feature selection and also for like the derived features they we need to know about, like, whether and like the pollutants, how each of the features interact with each other. Yes. Science care to figure out the AQI, so we need to do research independently to figure out Khan, see which is derived Khan nikhatsi, discard Khan Nikhat and stuff like that. You don't really
have to do them in in individually, yourself is key. Jo, man up, go, document, shop, analysis. Baa part leak, I would encourage you to look into that. And I think that will help you answer your question.
And also, sir, if you have like, some questions, like, publicly, up, say, privately, reach out.
You can just message me on Discord. I know kafir look on the message Kiran and my responses are slow, but I will try to respond to everyone at least after one day Maximum, or two day maximum, and try not to message on the weekend, please. I try to disconnect myself from everything in the weekend.
Last question, is there any search labels for the quizzes, like where we can study for them?
I'm not really quizzes many, but I say a few months ago, and they just did general data science stuff. And there are also some things that are linked to your project, just simple, some linear regression and classification aspect, probably to tell the difference between them. Khan some attributes for evaluating a model if it's a classification problem, if it's a regression problem. So yeah, of course, I would still encourage you guys to read up a general book for introduction to DS and all that stuff, data science. Okay? Muhammad Affan, do you have a question?
Yes. Shahir the repeat, now, work University, giving
I'll
try Yeah, I'll probably get this fixed in the next calls. If it rejoins, I'll probably message him. I have another call at 430 and I'll also try to fix this issue of the permissions so your experience is not impacted going forward. Now, if anyone else has any questions, just feel free to message them to me on Discord, and I'll get back to you by night or by tomorrow morning at the latest. Thank you guys. Ah, there's one more. Hand raised, okay, 430 reason you can ask questions very quickly, honey, sir.
Is there any limit to data size, like if I'm working on 1300
rows, is it enough or not?
Yeah, that's enough. But also ideal, ideal amount of days for whether AQ is two to three months, though, you shouldn't really go more than that, and even less than that, you can work with Sure. Okay, thank you guys for the office. Hello, office.
How accurate was this transcription?