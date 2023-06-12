from flask import Flask, jsonify, request
from flask_cors import CORS

import db
import re

def convert_forme(name):
    name = re.sub(r'([a-z])([A-Z])', r'\1-\2', name) # insert hyphen between lowercase and uppercase letters
    name = re.sub(r'(\D)(\d)', r'\1-\2', name) # insert hyphen between non-digit and digit
    name = re.sub(r'(\d)%', r'\1', name) # remove '%' after numbers
    name = re.sub(r' Forme', '', name) # remove ' Forme'
    name = name.lower() # convert to lowercase
    return name

def name_to_object(name):
    # Replace '.' with '-' before splitting
    name = name.replace('.', '-')
    split_name = name.split(' ')

    # Update regex to stop at the number before the "%" character
    icon_url = re.findall('[A-Z][^A-Z%]*', split_name[0])
    icon_url = [word.lower() for word in icon_url]

    if len(split_name) == 3:
        icon_url.append(split_name[2].lower())

    icon_url = '-'.join(icon_url)

    # Replace gender symbols with '-f' and '-m', respectively
    if '♀' in icon_url:
        icon_url = icon_url.replace('♀', '-f')
    elif '♂' in icon_url:
        icon_url = icon_url.replace('♂', '-m')

    # Replace apostrophe with nothing
    icon_url = icon_url.replace('\'', '')

    return {'name': split_name[-1], 'icon_url': icon_url}


        
    # split_name = name.split(' ')f

    # # Update regex to stop at the number before the "%" character
    # icon_url = re.findall('[A-Z][^A-Z%]*', split_name[0])
    # icon_url = [word.lower() for word in icon_url]

    # if len(split_name) == 3:
    #     icon_url.append(split_name[2].lower())

    # icon_url = '-'.join(icon_url)

    # Replace gender symbols with '-f' and '-m', respectively
    # if '♀' in icon_url:
    #     icon_url = icon_url.replace('♀', '-f')
    # elif '♂' in icon_url:
    #     icon_url = icon_url.replace('♂', '-m')

    # # Replace apostrophe with nothing
    # icon_url = icon_url.replace('\'', '')

    return ans

# test with some examples
# print(name_to_object("PinsirMega Pinsir"))
# print(name_to_object("Bulbasaur"))
# print(name_to_object("Venusaur"))
# print(name_to_object("VenusaurMega Venusaur"))
# print(name_to_object("Charmeleon"))
# print(name_to_object("CharizardMega Charizard X"))
# print(name_to_object("Farfetch'd"))
# print(name_to_object("BlazikenMega Blaziken"))
# print(name_to_object("PinsirMega Pinsir"))  # {'name': 'Pinsir', 'icon_url': 'pinsir-mega'}
# print(name_to_object("Bulbasaur"))  # {'name': 'Bulbasaur', 'icon_url': 'bulbasaur'}
# print(name_to_object("Mr. Mime"))  # {'name': 'Mime', 'icon_url': 'mr-mime'}
# print(name_to_object("Zygarde50% Forme")) 

    
app = Flask(__name__)
CORS(app)

allPokemon = db.get()

#set of all types
all_types = set()
for pokemon in allPokemon:
    # add all types to the set
    all_types.update([pokemon['type_one']])
    name_info = name_to_object(pokemon['name'])
    pokemon['name'] = name_info['name']
    pokemon['full_name'] = name_info['icon_url']

all_types = sorted(all_types)

@app.route('/icon/<name>')
def get_icon_url(name:str):
    return f"https://img.pokemondb.net/sprites/sword-shield/icon/{name}.png"

# Creating an index for each pokemon type
pokemon_by_type = {type_: [p for p in allPokemon if p['type_one'] == type_] for type_ in all_types}

@app.route('/pokemon/count')
def get_pokemon_count():
    typeFilter = request.args.get('typeFilter', '')
    if typeFilter:
        return str(len(pokemon_by_type[typeFilter]))
    else:
        return str(len(allPokemon))
    
# Cache for storing pages
page_cache = {}

def get_page(pageNum, pageSize, asc, typeFilter):
    # Check if the page is in the cache
    if (pageNum, pageSize, asc, typeFilter) in page_cache:
        return page_cache[(pageNum, pageSize, asc, typeFilter)]

    # Use the index to get the pokemon of the right type
    pokemon = pokemon_by_type[typeFilter] if typeFilter else allPokemon

    # Sort the pokemon
    pokemon = sorted(pokemon, key=lambda p: p['number'], reverse=not asc)

    # Get the right page
    page = pokemon[(pageNum-1)*pageSize:pageNum*pageSize]

    # Store the page in the cache
    page_cache[(pageNum, pageSize, asc, typeFilter)] = page

    return page

@app.route('/pokemon')
def get_pokemon_page():
    pageNum = int(request.args.get('page', 1))
    pageSize = int(request.args.get('pageSize', 20))
    filter_type = request.args.get('typeFilter', '')
    asc = request.args.get('asc', 'true') == 'true'
    return get_page(pageNum, pageSize, asc, filter_type)

@app.route('/pokemon/types', methods=['GET'])
def get_types():
    # This is a placeholder. Replace with your actual logic for fetching types.
    types = list(all_types)
    return jsonify(types)

if __name__=='__main__':
    app.run(port=8080)