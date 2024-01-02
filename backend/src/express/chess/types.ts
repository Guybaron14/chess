export const WHITE = 'w';
export const BLACK = 'b';

export const EMPTY = '0';

export const PAWN = 'P';
export const ROOK = 'R';
export const KNIGHT = 'N';
export const BISHOP = 'B';
export const QUEEN = 'Q';
export const KING = 'K';

export const ROOK_WHITE = 'R';
export const PAWN_WHITE = 'P';
export const KNIGHT_WHITE = 'N';
export const BISHOP_WHITE = 'B';
export const QUEEN_WHITE = 'Q';
export const KING_WHITE = 'K';

export const PAWN_BLACK = 'p';
export const ROOK_BLACK = 'r';
export const KNIGHT_BLACK = 'n';
export const BISHOP_BLACK = 'b';
export const QUEEN_BLACK = 'q';
export const KING_BLACK = 'k';

export type Piece = 'p' | 'r' | 'n' | 'b' | 'q' | 'k' | 'P' | 'R' | 'N' | 'B' | 'Q' | 'K' | '0';
export type Turn = 'w' | 'b';
export type Board = Piece[][];
export type Move = { move: string; score: number };
