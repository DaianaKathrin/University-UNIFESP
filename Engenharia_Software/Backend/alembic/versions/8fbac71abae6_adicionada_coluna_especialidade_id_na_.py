"""Adicionada coluna especialidade_id na consulta

Revision ID: 8fbac71abae6
Revises: 26fc7ec6027e
Create Date: 2022-01-31 22:39:23.768600

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8fbac71abae6'
down_revision = '26fc7ec6027e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('consultas', sa.Column('Especialidade_ID', sa.String(), nullable=True))
    op.create_foreign_key(None, 'consultas', 'especialidades', ['Especialidade_ID'], ['Especialidade_ID'])
    op.drop_column('consultas', 'Anamnese')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('consultas', sa.Column('Anamnese', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'consultas', type_='foreignkey')
    op.drop_column('consultas', 'Especialidade_ID')
    # ### end Alembic commands ###
