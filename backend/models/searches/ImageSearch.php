<?php

namespace app\models\searches;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\Image;

/**
 * ImageSearch represents the model behind the search form about `app\models\Image`.
 */
class ImageSearch extends Image
{
    public $tag_id;
    public $owner_id;

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id', 'owner_id'], 'integer'],
            [['tag_id'], 'filter', 'filter' => function($ids) {
                return preg_split('/\s*,\s*/', $ids, -1, PREG_SPLIT_NO_EMPTY);
            }],
            ['tag_id', 'each', 'rule' => ['integer']],
            [['name', 'url'], 'safe'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = Image::find();

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        $this->load($params);

        if (!$this->validate()) {
            print_r($this->errors);
            // uncomment the following line if you do not want to return any records when validation fails
            $query->where('0=1');
            return $dataProvider;
        }

        $query->joinWith(['tags']);
        $query->groupBy(['image.id']);

        $query->andFilterWhere([
            'image.id' => $this->id,
            'owner_id' => $this->owner_id,
            'tag.id' => $this->tag_id,
        ]);

        if ($this->tag_id) $query->having(['COUNT(DISTINCT tag.id)' => count($this->tag_id)]);

        $query->andFilterWhere(['like', 'image.name', $this->name])
            ->andFilterWhere(['like', 'url', $this->url]);

        return $dataProvider;
    }
}
