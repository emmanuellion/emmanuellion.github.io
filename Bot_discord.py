# if __name__ == '__main__':
print("lancement du bot...")
import discord
from discord.ext import commands
from discord.utils import get
import requests
import json
from pprint import pprint
import datetime
from discord.ext.commands import Bot
bot = discord.Client()
token = "NzMxODM5MTQ0MTU3OTA1MDA3.Xwr4YA.MrKsl2CP4Y3NPiCdvAozcyY2wxI"#serve La Bagarre : NzMxODc5MjI5ODYzNjI0Nzc1.Xwsd8w.-n00dk21CmtQjiPBPKwtCnOIuXI
bot = commands.Bot(command_prefix="!")
print("Bot lancé !")


@bot.event
async def on_ready():
    await bot.change_presence(status=discord.Status.online, activity=discord.Game("Se fait coder"))


@bot.event
async def on_member_join(member):
    await member.send("Bienvenue " + str(member.mention) + " dans " + str(member.guild) +
                    " !!! Par contre pourquoi ce putain de MEE6 dit encore de la merde ??!")
    if int(member.premium_since) > 0:
        await member.send("Alors comme ça on paie pour être premium ... Et en plus depuis" + str(member.premium_since))
    else:
        await member.send("Ca va, toi t'es unn vrai, tu paies pas le premium ...")


@bot.event
async def on_raw_reaction_add(payload):
    emoji = payload.emoji.name  # recupere l'emoji
    canal = str(payload.channel_id)  # recupere le numero du canal
    message = str(payload.message_id)  # recupere le numero du message
    admin_role = get(bot.get_guild(payload.guild_id).roles, name="admin")
    membre = bot.get_guild(payload.guild_id).get_member(payload.user_id)
    if canal == "731890734311145552" and message == "731891034778370120" and emoji == "Yes":
        await membre.add_roles(admin_role)
        await membre.send("Tu obtiens le grade admin !")


@bot.event
async def on_raw_reaction_remove(payload):
    emoji = payload.emoji.name  # recupere l'emoji
    canal = str(payload.channel_id)  # recupere le numero du canal
    message = str(payload.message_id)  # recupere le numero du message
    admin_role = get(bot.get_guild(payload.guild_id).roles, name="admin")
    membre = bot.get_guild(payload.guild_id).get_member(payload.user_id)
    if canal == "731890734311145552" and message == "731891034778370120" and emoji == "Yes":
        await membre.remove_roles(admin_role)
        await membre.send("Tu perds le grade admin !")


@bot.command()
async def website(ctx):
    await ctx.send("-**1** : https://senary-hardness.000webhostapp.com/\n-**2** : https://mabule.github.io/")


@bot.command()
async def changeActivity(ctx, arg1):
    activity = arg1
    await ctx.send("Activité changée pour : " + activity)
    await bot.change_presence(status=discord.Status.idle, activity=discord.Game(str(activity)))


@bot.command()
async def teste(ctx, arg):
    await ctx.send(arg)


@bot.command()
async def weather(ctx):
    r = requests.get("http://api.openweathermap.org/data/2.5/weather?q=Nîmes&appid=67304d7d1f587faeb69efa2619a1e0c7")
    data = r.json()
    with open("weather.json", "w") as f:
        json.dump(data, f)
    pprint(data)
    print("\n\n\n")
    place = str(data['name'])
    sunset = datetime.datetime.fromtimestamp(data['sys']['sunset'])
    sunrise = datetime.datetime.fromtimestamp(data['sys']['sunrise'])
    description = data['weather'][0]['description']
    temp = str(data.get('main'))
    print(temp)
    temp_max = str(data['main']['temp_max'] - 273.15)
    temp_min = str(data['main']['temp_min'] - 273.15)
    humidity = str(data['main']['humidity'])
    print(str(place) + str(sunset) + str(sunrise) + str(description) + str(temp_max) + str(temp_min) + str(humidity))
    await ctx.send(">>> **---------------------------------------------------------------------**\n" +
                   "**-Provenance de la météo : **" + str(place) + "\n" +
                   "**-Heure couché de soleil : **" + str(sunset) + "\n" +
                   "**-Heure levé de soleil : **" + str(sunrise) + "\n" +
                   "**-Description du temps : **" + str(description) + "\n" +
                   "**-Température max : **" + str(temp_max) + "°C" + "\n" +
                   "**-Température minimale : **" + str(temp_min) + "°C" + "\n" +
                   "**-Taux d'humidité : **" + str(humidity) + "%\n" +
                   "**---------------------------------------------------------------------**")


@bot.command(pass_context=True)
async def id(ctx, membre: discord.Member):
    pseudo = membre.mention
    id = membre.id
    print(str(pseudo))
    print(str(id))
    await ctx.send(str(pseudo) + " : " + str(id) + " is your id") # "{}" format(ctx.message.author.id)


bot.run(token)