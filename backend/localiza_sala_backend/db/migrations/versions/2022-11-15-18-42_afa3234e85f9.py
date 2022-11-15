"""empty message

Revision ID: afa3234e85f9
Revises: 9fe0cd75d4d9
Create Date: 2022-11-15 18:42:51.580155

"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "afa3234e85f9"
down_revision = "9fe0cd75d4d9"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column("courses", sa.Column("room_id", sa.Integer(), nullable=True))
    op.create_foreign_key(None, "courses", "rooms", ["room_id"], ["id"])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, "courses", type_="foreignkey")
    op.drop_column("courses", "room_id")
    # ### end Alembic commands ###
