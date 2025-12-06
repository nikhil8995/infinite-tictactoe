from flask import Flask, render_template, jsonify, request
from datetime import datetime

app = Flask(__name__)

# Game state storage (in production, use a database or session)
games = {}


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/new_game', methods=['POST'])
def new_game():
    game_id = str(datetime.now().timestamp())
    games[game_id] = {
        'board': [''] * 9,
        'current_player': 'X',
        'move_history': [],  # List of (position, player, move_number)
        'move_count': 0
    }
    return jsonify({'game_id': game_id, 'board': games[game_id]['board'], 'current_player': 'X'})


@app.route('/api/make_move', methods=['POST'])
def make_move():
    data = request.json
    game_id = data.get('game_id')
    position = data.get('position')

    if game_id not in games:
        return jsonify({'error': 'Game not found'}), 404

    game = games[game_id]

    # Check if position is valid
    if game['board'][position] != '':
        return jsonify({'error': 'Position already occupied'}), 400

    # Make the move
    player = game['current_player']
    game['board'][position] = player
    game['move_count'] += 1
    game['move_history'].append({
        'position': position,
        'player': player,
        'move_number': game['move_count']
    })

    # Remove the oldest move if we have more than 3 moves per player (6 total)
    removed_position = None
    if len(game['move_history']) > 6:
        oldest_move = game['move_history'].pop(0)
        removed_position = oldest_move['position']
        game['board'][removed_position] = ''

    # Get the move that will fade next (3rd oldest)
    fading_position = None
    if len(game['move_history']) >= 6:
        fading_position = game['move_history'][0]['position']

    # Switch player
    game['current_player'] = 'O' if player == 'X' else 'X'

    # Check for winner
    winner = check_winner(game['board'])

    return jsonify({
        'board': game['board'],
        'current_player': game['current_player'],
        'winner': winner,
        'removed_position': removed_position,
        'fading_position': fading_position,
        'move_history': game['move_history']
    })


def check_winner(board):
    # Winning combinations
    winning_combinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  # Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  # Columns
        [0, 4, 8], [2, 4, 6]              # Diagonals
    ]

    for combo in winning_combinations:
        if board[combo[0]] != '' and \
           board[combo[0]] == board[combo[1]] == board[combo[2]]:
            return board[combo[0]]

    return None


if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
