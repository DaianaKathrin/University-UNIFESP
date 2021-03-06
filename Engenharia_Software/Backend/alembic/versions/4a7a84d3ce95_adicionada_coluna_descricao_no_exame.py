"""Adicionada coluna descricao no exame

Revision ID: 4a7a84d3ce95
Revises: 8fbac71abae6
Create Date: 2022-02-08 23:15:41.632062

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4a7a84d3ce95'
down_revision = '8fbac71abae6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('exames', sa.Column('Descricao', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('exames', 'Descricao')
    # ### end Alembic commands ###
