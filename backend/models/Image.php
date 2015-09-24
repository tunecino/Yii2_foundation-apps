<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "image".
 *
 * @property integer $id
 * @property integer $owner_id
 * @property string $name
 * @property string $url
 *
 * @property Owner $owner
 * @property ImageHasTag[] $imageHasTags
 * @property Tag[] $tags
 */
class Image extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'image';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['owner_id', 'name', 'url'], 'required'],
            [['owner_id'], 'integer'],
            [['name'], 'string', 'max' => 60],
            [['url'], 'string', 'max' => 255],
            [['url'], 'url', 'defaultScheme' => 'http']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'owner_id' => 'Owner ID',
            'name' => 'Name',
            'url' => 'Url',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getOwner()
    {
        return $this->hasOne(Owner::className(), ['id' => 'owner_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getImageHasTags()
    {
        return $this->hasMany(ImageHasTag::className(), ['image_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTags()
    {
        return $this->hasMany(Tag::className(), ['id' => 'tag_id'])->viaTable('image_has_tag', ['image_id' => 'id']);
    }

    /**
     * @inheritdoc
     * @return \app\models\queries\ImageQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \app\models\queries\ImageQuery(get_called_class());
    }

    public function extraFields()
    {
        return ['tags'];
    }
}
