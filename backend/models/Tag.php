<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "tag".
 *
 * @property integer $id
 * @property string $name
 *
 * @property ImageHasTag[] $imageHasTags
 * @property Image[] $images
 */
class Tag extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'tag';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name'], 'required'],
            [['name'], 'unique'],
            [['name'], 'string', 'max' => 12]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
        ];
    }

    public function behaviors()
    {
        return [
            'linkGroupBehavior' => [
                'class' => \yii2tech\ar\linkmany\LinkManyBehavior::className(),
                'relation' => 'images', // relation, which will be handled
                'relationReferenceAttribute' => 'imageIds', // virtual attribute, which is used for related records specification
            ],
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getImageHasTags()
    {
        return $this->hasMany(ImageHasTag::className(), ['tag_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getImages()
    {
        return $this->hasMany(Image::className(), ['id' => 'image_id'])->viaTable('image_has_tag', ['tag_id' => 'id']);
    }

    /**
     * @inheritdoc
     * @return \app\models\queries\TagQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \app\models\queries\TagQuery(get_called_class());
    }

    public function extraFields()
    {
        return ['images'];
    }
}
