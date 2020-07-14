print("lancement du bot...")
import discord
from discord.ext import commands
from discord.utils import get
import requests
import json
from pprint import pprint
import datetime
from discord.ext.commands import Bot
from discord.ext.commands import has_permissions, MissingPermissions
import time
bot = discord.Client()
token = "Votre token"
bot = commands.Bot(command_prefix="!")


@bot.event
async def on_ready():
    with open('save.json') as data_file:
        data_loaded = json.load(data_file)
    activity = data_loaded['activity']
    print("Activity onload = " + str(activity))
    await bot.change_presence(status=discord.Status.online, activity=discord.Game(str(activity)))
    print("Bot lancé !")


@bot.event
async def on_member_join(member):
    print("New member ! Welcome to " + str(member.mention))
    await member.send("Bienvenue " + str(member.mention) + " dans " + str(member.guild) + " !!!")


@bot.event #@has_permissions(manage_roles=True)
async def on_raw_reaction_add(payload):
    emoji = payload.emoji.name  # recupere l'emoji
    canal = str(payload.channel_id)  # recupere le numero du canal
    message = str(payload.message_id)  # recupere le numero du message
    admin_role = get(bot.get_guild(payload.guild_id).roles, name="Admin")
    membre = bot.get_guild(payload.guild_id).get_member(payload.user_id)
    if canal == "732324781608796270" and message == "732326914899050498" and emoji == "Yes":
        print("Add role : " + str(admin_role) + " to " + str(membre))
        await membre.add_roles(admin_role)


@bot.event
async def on_raw_reaction_remove(payload):
    emoji = payload.emoji.name  # recupere l'emoji
    canal = str(payload.channel_id)  # recupere le numero du canal
    message = str(payload.message_id)  # recupere le numero du message
    admin_role = get(bot.get_guild(payload.guild_id).roles, name="Admin")
    membre = bot.get_guild(payload.guild_id).get_member(payload.user_id)
    if canal == "732324781608796270" and message == "732326914899050498" and emoji == "Yes":
        print("Remove role : " + str(admin_role) + " to " + str(membre))
        await membre.remove_roles(admin_role)


@bot.command()
async def website(ctx):
    embed = discord.Embed(title="Site web", description="", color=0x3366CC)
    embed.add_field(name="🌐 💻 🖥️Site multi-usage :", value="https://mabule.github.io/", inline=False)
    await ctx.send(embed=embed)


@bot.command()
async def changeA(ctx, arg1):
    activity = arg1
    await ctx.send("Activité changée pour : " + activity)
    await bot.change_presence(status=discord.Status.idle, activity=discord.Game(str(activity)))
    data = dict()
    data["activity"] = activity
    with open("save.json", "w") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
        print("données enregistrées : " + str(data["activity"]))


level_display_weather = 2
@bot.command()
async def display(ctx, arg3):
    global level_display_weather
    level_display_weather = int(arg3)
    if level_display_weather == 1:
        await ctx.send("Vous avez changé l'affichage de la météo en mode **précis**")
    elif level_display_weather == 2:
        await ctx.send("Vous avez changé l'affichage de la météo en mode **basique**")


@bot.command()
async def weather(ctx):
    global level_display_weather
    r = requests.get(
        "http://api.openweathermap.org/data/2.5/weather?q=Nîmes&appid=67304d7d1f587faeb69efa2619a1e0c7")
    data = r.json()
    with open("weather.json", "w") as f:
        json.dump(data, f)
    print("\n\n\n")
    pprint(data)
    place = str(data['name'])
    sunset = datetime.datetime.fromtimestamp(data['sys']['sunset'])
    sunrise = datetime.datetime.fromtimestamp(data['sys']['sunrise'])
    description = str(data['weather'][0]['description'])
    feeling = str(data['main']['feels_like'] - 273.15)
    temp = str(data['main']['temp'] - 273.15)
    temp_max = str(data['main']['temp_max'] - 273.15)
    temp_min = str(data['main']['temp_min'] - 273.15)
    pressure = str(data['main']['pressure'])
    humidity = str(data['main']['humidity'])
    wind_loc = str(data['wind']['deg'])
    wind_speed = str(data['wind']['speed'])
    print("Send the weather with level of precision equals to : " + str(level_display_weather))
    if level_display_weather == 1:
        embed = discord.Embed(title="Météo", description="Météo actuelle || ☀☁⛅⛈️🌤️🌥️🌦️🌧️🌨️🌩️", color=0x3366CC)
        embed.add_field(name="🧭Provenance de la météo :", value=place, inline=False)
        embed.add_field(name="🌄Heure levé de soleil :", value=str(sunrise), inline=False)
        embed.add_field(name="🌅Heure couché de soleil :", value=str(sunset), inline=False)
        embed.add_field(name="☀☁Description du temps :", value=description, inline=False)
        embed.add_field(name="🌡️Température actuelle :", value=temp + " °C", inline=False)
        embed.add_field(name="🌡️Température ressentie :", value=feeling + " °C", inline=False)
        embed.add_field(name="🌡️Température max :", value=temp_max + " °C", inline=False)
        embed.add_field(name="🌡️Température minimale :", value=temp_min + " °C", inline=False)
        embed.add_field(name="🌋Pression :", value=pressure + " hPa", inline=False)
        embed.add_field(name="💧Taux d'humidité :", value=humidity + " %", inline=False)
        embed.add_field(name="🧭🌪️️Provenance du vent :", value=wind_loc + " deg", inline=False)
        embed.add_field(name="🌪️Vitesse du vent :", value=wind_speed + " km/h", inline=False)
        await ctx.send(embed=embed)
    elif level_display_weather == 2:#message.channel.send
        await ctx.send(">>> **---------------------------------------------------------------------**\n" +
                                   "**-Provenance de la météo : **" + str(place) + "\n" +
                                   "**-Heure couché de soleil : **" + str(sunset) + "\n" +
                                   "**-Heure levé de soleil : **" + str(sunrise) + "\n" +
                                   "**-Description du temps : **" + str(description) + "\n" +
                                   "**-Température : **" + temp + "°C" + "\n" +
                                   "**-Taux d'humidité : **" + str(humidity) + "%\n" +
                                   "**---------------------------------------------------------------------**")


@bot.command()
async def ping(ctx):
    now = datetime.datetime.now().timestamp() * 1000
    message = await ctx.send("Pong!")
    ping = datetime.datetime.now().timestamp()*1000 - now
    await message.edit(content=f"Ping!  `{int(ping)}ms`")
    print("ping = " + str(ping))


@bot.command(pass_context=True)
async def id(ctx, membre: discord.Member):
    pseudo = membre.mention
    id = membre.id
    print(str(pseudo))
    print(str(id))
    await ctx.send(str(pseudo) + " : " + str(id) + " is your id")


bot.run(token)